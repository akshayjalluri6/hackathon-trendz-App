import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';  // Import js-cookie
import './index.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const userDetails = { username, password };
        const url = 'http://localhost:5000/login';
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            alert('Login Successful');
            Cookies.set('token', data.jwtToken);  // Store JWT token in a cookie
            navigate('/');  // Change this to your dashboard route
        } else {
            alert('Login Failed');
        }
    };

    return (
        <div className='login-container'>
            <div className='login-image'>
                <h1>Welcome Back!</h1>
            </div>
            <div className='login-form-container'>
                <form className='login-form' onSubmit={onSubmitForm}>
                    <h2>Login</h2>
                    <div className="field-container">
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <input
                            className='form-input'
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="field-container">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            className='form-input'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='login-button' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
