import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const fetchItemsByCategory = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => response.json())
      .then(data => setItems(data));
    setSelectedCategory(category);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="container">
      <header className="header">
        <h2 id='shopName'>Various shop</h2>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className="category-button"
              onClick={() => fetchItemsByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>
      {!selectedCategory ? (
        <div>
          <h2>Please select a category</h2>
        </div>
      ) : (
        <>
            {showCart ? (
              <Cart cart={cart} totalPrice={getTotalPrice()} onBack={toggleCart} />
            ) : (
              <button onClick={toggleCart} className="cart-button">Cart</button>
            )}
          <h2>Our products</h2>
          <div className="card-container">
            {items.map(item => (
              <div className="card" key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <img id='image' src={item.image} alt={item.title} />
                <p>Price: ${item.price}</p>
                <button onClick={() => addToCart(item)}>Add to cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

