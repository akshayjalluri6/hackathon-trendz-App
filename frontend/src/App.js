import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginFrom from './components/LoginFrom';
import RegisterForm from './components/RegisterFrom';
import Navbar from './components/Navigation';  // Import the Navbar component
import Cart from './components/Cart';  // Import the Cart component
import './App.css';

const App = () => (
  <div className="app-container">
    <BrowserRouter>
      {/* Include the Navbar component */}
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} /> {/* Use element instead of Component */}
        <Route exact path='/login' element={<LoginFrom />} />
        <Route exact path='/register' element={<RegisterForm />} />
        <Route exact path='/cart' element={<Cart />} /> {/* Add route for the Cart component */}
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
