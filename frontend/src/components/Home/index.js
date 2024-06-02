import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';  // Import js-cookie

import './index.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = Cookies.get('token');  // Retrieve token using js-cookie

            const response = await fetch('http://localhost:5000/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        const newTotalPrice = totalPrice + product.price;
        setTotalPrice(newTotalPrice);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.product_id !== productId);
        setCart(updatedCart);
        const removedItem = products.find((item) => item.product_id === productId);
        const newTotalPrice = totalPrice - removedItem.price;
        setTotalPrice(newTotalPrice);
    };

    return (
        <div className='home-container'>
            <h1>Trendz - Home Page</h1>
            <div className='products-grid'>
                {products.map((product) => (
                    <div key={product.product_id} className='product-card'>
                        <img src={product.product_image} alt={product.product_name} className='product-image' />
                        <h2 className='product-name'>{product.product_name}</h2>
                        <p className='product-price'>${product.price}</p>
                        <p className='product-rating'>Rating: {product.rating}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <div className='cart'>
                <h2>Cart</h2>
                {cart.map((item) => (
                    <div key={item.product_id} className='cart-item'>
                        <img src={item.product_image} alt={item.product_name} />
                        <div>
                            <h3>{item.product_name}</h3>
                            <p>${item.price}</p>
                            <button onClick={() => removeFromCart(item.product_id)}>Remove</button>
                        </div>
                    </div>
                ))}
                <h3>Total Price: ${totalPrice}</h3>
            </div>
        </div>
    );
};

export default Home;
