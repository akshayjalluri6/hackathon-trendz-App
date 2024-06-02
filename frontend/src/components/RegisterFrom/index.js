import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faVenusMars, faCalendar, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        age: '',
        location: '',
        phone: '',
        email: ''
    });

    const navigate = useNavigate();

    const onChangeFormData = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmitRegisterForm = async (event) => {
        event.preventDefault();
        const { username, password, confirmPassword, gender, age, location, phone, email } = formData;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userDetails = { username, password, gender, age, location, phone, email };
        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            });
            const data = await response.json();
            if (data.status === 'ok') {
                alert('Registration Successful');
                navigate('/login');
            } else {
                alert('Registration Failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className='register-container'>
            <form className='register-form' onSubmit={onSubmitRegisterForm}>
                <h2>Register</h2>
                <div className="field-container">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input type='text' name='username' placeholder='Username' value={formData.username} onChange={onChangeFormData} />
                </div>
                <div className="field-container">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type='password' name='password' placeholder='Password' value={formData.password} onChange={onChangeFormData} />
                </div>
                <div className="field-container">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type='password' name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={onChangeFormData} />
                </div>
                <div className="field-container">
                    <FontAwesomeIcon icon={faVenusMars} className="icon" />
                    <input type='text' name='gender' placeholder='Gender' value={formData.gender} onChange={onChangeFormData} />
                </div>
                <div className="field-container">
                    <FontAwesomeIcon icon={faCalendar} className="icon" />
                    <input type='number' name='age' placeholder='Age' value={formData.age} onChange={onChangeFormData} />
                </div>
                <div className="field-container">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                    <input type='text' name='location' placeholder='Location' value={formData.location} onChange={onChangeFormData} />
                </div>
                <div className="field-container">
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                    <input type='text' name='phone' placeholder='Phone' value={formData.phone} onChange={onChangeFormData} />
                </div>
                <div className="field-container">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <input type='text' name='email' placeholder='Email' value={formData.email} onChange={onChangeFormData} />
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
