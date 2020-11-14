'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// DOM elements
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// structuring the code as per the Architecture

// workout class (parent)
class Workout {
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; // kms
    this.duration = duration; // mins
    this.date = new Date();
    this.id = Date.now();
    // console.log(this);
  }
}

// child class for running type workout
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.type = 'running';
    this.calcPace();
  }
  calcPace() {
    // mins taken to cover one km
    this._pace = this.duration / this.distance;
    return this._pace;
  }
  get pace() {
    return `${this._pace} mins/km .`;
  }
}

// child class for cycling type workout
class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.type = 'cycling';
    this.calcSpeed();
  }
  calcSpeed() {
    // kms covered in one hr
    this._speed = (this.distance * 60) / this.duration;
    return this._speed;
  }
  get speed() {
    return `${this._speed} kmph .`;
  }
}

// MAIN APPLICATION
class App {
  // private attributes
  #map;
  #mapEvent;
  #workouts = [];

  // class methods
  constructor() {
    this._getLocation();
    // handleSubmit
    form.addEventListener('submit', this._newWorkout.bind(this));
    // Running or  cycling, toggling the input fields
    inputType.addEventListener('change', this._toggleElevationField);
    // move to the marker when a workout is clicked
    containerWorkouts.addEventListener('click', this._moveToMarker.bind(this));
    // fetch all the previous workouts from localStorage
    this.#workouts = JSON.parse(localStorage.workouts) || [];
    // render the locally stored workouts initially
    this._renderWorkouts();
    // add the markers for each and every workouts
    this.#workouts.forEach(workout => this._restoreProto(workout));
    console.log(this.#workouts);
  }

  // getting the current geolocation of the user
  _getLocation() {
    navigator.geolocation?.getCurrentPosition(this._loadMap.bind(this), () => {
      alert("We weren't able to access your current location");
    });
  }

  // Displaying the map in the UI
  _loadMap({ coords }) {
    const { latitude, longitude } = coords;
    this.#map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude])
      .addTo(this.#map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
    // show the form when the map is clicked
    this.#map.on('click', this._showForm.bind(this));
    // add the markers for the previous workouts from the local Storage
    this.#workouts.forEach(wo => this.addMarker(wo));
  }

  // Display the form when the user clicks on the map
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  // Toggle input fields acc. to running and cycling
  _toggleElevationField() {
    [inputCadence, inputElevation].forEach(input =>
      input.parentNode.classList.toggle('form__row--hidden')
    );
  }

  // manually restoring the protoypes for the objects from localStorage
  _restoreProto(wo) {
    wo.type === 'running'
      ? (wo.__proto__ = Running.prototype)
      : wo.type === 'cycling'
      ? (wo.__proto__ = Cycling.prototype)
      : '';

    return wo;
  }

  // handle the submission of the form
  _newWorkout(e) {
    e.preventDefault();

    // required variables
    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];
    let workout;

    // input validation
    // check if its a number and  the number is positive
    const validation = (...props) => {
      let bools = props.map(prop => Number(prop) >= 0);
      return bools.every(item => item);
    };

    // Creating a new object based on the new workout
    if (inputType.value === 'running') {
      // add the running object if the inputs are all valid
      if (
        validation(
          +inputDistance.value,
          +inputDuration.value,
          +inputCadence.value
        )
      ) {
        workout = new Running(
          coords,
          +inputDistance.value,
          +inputDuration.value,
          +inputCadence.value
        );
        this.#workouts.push(workout);
      } else {
        alert('Invalid input');
      }
    } else if (inputType.value === 'cycling') {
      // add a cycling object if the inputs are all valid
      if (
        validation(
          +inputDistance.value,
          +inputDuration.value,
          +inputElevation.value
        )
      ) {
        workout = new Cycling(
          coords,
          +inputDistance.value,
          +inputDuration.value,
          +inputElevation.value
        );
        this.#workouts.push(workout);
        console.log(this.#workouts);
      } else {
        // yell at the user
        alert('Invalid inputs');
      }
    }
    // add the marker to the map
    this.addMarker(workout);
    // clearing the  input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';
    // hiding the form
    form.classList.add('hidden');
    // update the ui with the new workout everytime an object is created
    this._renderWorkouts();
    // update the localStorage everytime the workouts are updated
    localStorage.workouts = JSON.stringify(this.#workouts);
  }
  addMarker(workout) {
    // leaflet function
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 400,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? 'Running' : 'Cycling'} for ${
          workout.distance
        } kms`
      )
      .openPopup();
  }
  _renderWorkouts() {
    // clear the content that was there before
    containerWorkouts.innerHTML = '';
    // insert the form alone that wasn't supposed to be removed
    containerWorkouts.insertAdjacentElement('afterbegin', form);
    // now render all the workouts in order
    this.#workouts.forEach(wo => {
      // boolean for running or cycling determination
      const isRunning = wo.type === 'running';
      // utility function
      const computeTitle = workout => {
        // console.log(workout);
        return `${isRunning ? 'Running' : 'Cycling'} on ${
          months[new Date(workout.date).getMonth()]
        } ${new Date(workout.date).getDate()}`;
      };

      const markup =
        //prettier-ignore
        `
        <li class="workout workout--${wo.type}" data-id="${wo.id}">
          <h2 class="workout__title">${computeTitle(wo)}</h2>
          <div class="workout__details">
            <span class="workout__icon">${isRunning?'🏃‍♂️':'🚴‍♀️'}</span>
            <span class="workout__value">${wo.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${wo.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${isRunning? wo._pace: wo._speed}</span>
            <span class="workout__unit">${isRunning?'min/km':'km/h'}</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${isRunning?"🦶🏼":"⛰"}</span>
            <span class="workout__value">${isRunning? wo.cadence: wo.elevation}</span>
            <span class="workout__unit">${isRunning?'spm':'m'}</span>
          </div>
        </li>`;
      // insert the markup
      containerWorkouts.insertAdjacentHTML('beforeend', markup);
    });
  }
  _moveToMarker(e) {
    // extracting the target element
    const element = e.target.closest('.workout');
    if (!element) return;
    // data-id attribute of the selected element
    const currentId = element.dataset.id;
    // filtering the object based on the id
    const [currentObj] = this.#workouts.filter(wo => wo.id === +currentId);
    // getting the co-ords
    const { coords } = currentObj;
    // set the view of the map to the clicked workout
    this.#map.setView(coords, 16, { animate: true, pan: { duration: 1 } });
  }
}

const app = new App();
