import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function Register() {
  const [userName, setUserName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/Users', {
        user_name: userName,
        company_name: companyName,
        email: email,
        password: password
      });
      if (response.status === 200 || response.status === 201) {
        alert('User added successfully!');
        navigate('/login');
      } else {
        alert('Failed to register');
      }
    } catch (error) {
      alert('An error occurred during registration');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                className="form-control"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary btn-block">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
