import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

/**
 * Promise that gets rejected after a certain time, (based on the argument given).
 * @param {Number} s - number of seconds the timeout should last.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Asynchronous function that takes in a url and returns the object after converting the JSON returned from the API request.
 * @param {String} url - The url to which the GET request should be sent.
 */
export const getJSON = async function (url) {
  try {
    // promise.race between a 5 second timeout and the fetch function
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    // throw an error if the resulting object is not what we expected
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Async function that sends data to the api as a POST request and returns a JS object.
 * @param {String} url - The url to which the POST request should be sent.
 * @param {Object} uploadData - The data to be uploaded. (JS object)
 */
export const sendJSON = async function (url, uploadData) {
  try {
    // promise.race between a 5 second timeout and the fetch function
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();
    // throw an error if the resulting object is not what we expected
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
