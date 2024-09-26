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
      const response = await axios.post('http://localhost:3000/register', {
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
            setErrors(['Unexpected error occur.'])
        }

    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>

      {errors.length > 0 && (
        <div>
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}

    </form>
  );
}

export default Register;