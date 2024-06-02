import React, { useState } from 'react';
import './index.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // State to hold the cart items

  // Function to remove an item from the cart
  const removeFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter((item) => item !== itemToRemove));
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </div>
            </div>
          ))}
          <p>Total: ${calculateTotal()}</p>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
