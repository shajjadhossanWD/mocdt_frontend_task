import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken ,setUserRefetch,userRefetch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://mocdt-backend-task-x5ie.vercel.app/api/v1/user/signin', {
        email,
        password
      });
     // Handle the response
      const token = response.data.token;
      // Store the token in local storage
      localStorage.setItem('emailapp', token);
      setUserRefetch(!userRefetch)
      setToken(response.data.token);
      alert("Successfully logged in")
      navigate("/")
      
    } catch (error) {
      console.error('Error logging in:', error);
      alert("error comes")
    }
  };

  return (
    <div className='container pt-5'>
      <h2 className='mt-4 mb-3'>LOGIN</h2>
      <div className='input_group'>
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2 w-50" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> 
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="form-control mb-2 w-50" 
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin} className='btn btn-success w-50 mb-3'>LOGIN</button>
      <p>
        Don't have an account? <Link to="/register">Click here</Link> to register.
      </p>
      </div>
    </div>
  );
}

export default LoginPage;
