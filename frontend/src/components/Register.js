import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        user: {
            username,
            email,
            password
        }
      });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);

      alert("Regitrarion complete!");

      navigate('/login');

    } catch (error) {
        if (error.response && error.response.data.error) {
           setErrors(error.response.data.error);
        } else {
            setErrors([' Unexpected error occur.'])
        }

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
  
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
  
        {errors.length > 0 && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erro!</strong>
            <span className="block sm:inline">{errors.join(', ')}</span>
          </div>
        )}
  
      </form>
    </div>
  );
}

export default Register;