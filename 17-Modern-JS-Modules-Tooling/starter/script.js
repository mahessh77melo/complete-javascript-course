import './shoppingCart.js';
import { cart, addToCart } from './shoppingCart.js';
console.log('Importing module');
addToCart(4, 'Pencil');
import add from './shoppingCart.js';
console.log(add);
console.log(cart);
// the cart that was imported was no just a copy , that was the reference of the original object/array.
