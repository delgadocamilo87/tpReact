import React from 'react';
import './Cart.css';

function Cart({ cart, totalPrice, onBack }) {
  return (
    <div className="cart">
      <h2>Chart</h2>
      {cart.length === 0 ? (
        <p>the chart it's empty...</p>
      ) : (
        <>
          <div>
            {cart.map(item => (
              <div  id='cardItems' key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <img id='image' src={item.image} alt={item.title} />
                <p>Price: ${item.price}</p>
              </div>
            ))}
          </div>
          <p>Total Price: ${totalPrice}</p>
        </>
      )}
      <button onClick={onBack}>close</button>
    </div>
  );
}

export default Cart;
