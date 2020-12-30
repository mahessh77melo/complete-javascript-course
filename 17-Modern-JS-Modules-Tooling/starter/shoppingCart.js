console.log('Exporting module');
const cart = [];
export const addToCart = (quantity, product) => {
  cart.push({ quantity, product });
  console.log(
    `${quantity} ${product}${quantity === 1 ? '' : 's'} --> added to the cart`
  );
  console.log(cart);
};
export { cart };
export default addToCart;
