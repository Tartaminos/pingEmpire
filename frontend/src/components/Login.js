import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/dashboard');
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
          <button type="submit">Log in</button>

          {errors.length > 0 && (
            <div>
              {errors}
            </div>
          )}
        </form>
    );
}

export default Login;