import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imapPassword, setImapPassword] = useState('');
  const navigate = useNavigate();
  const { currentUser, setToken , token} = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?._id) {
      navigate("/", { replace: true });
    }
  }, [currentUser, token]);

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://mocdt-backend-task-x5ie.vercel.app/api/v1/user/signup', {
        name,
        email,
        password,
        imapPassword 
      });
      setToken(response.data.token);
      localStorage.setItem("emailapp", response.data.token);      
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error);
      alert(error.message)
    }
  };

  return (
    <div className='container pt-5'>
      <h2 className='mt-4 mb-3'>REGISTER</h2>
      <div className='input_group'>
      <label htmlFor="name" className="text-start">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control w-50" 
        required
      />
      <br />
      
      <label htmlFor="email" className="text-start">Email Address</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control w-50" 
        required
      />
      <br />
      <label htmlFor="password"  className="text-start">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control w-50" 
        required
      />
      <br />
      <label htmlFor="imapPassword" className="text-start">Please add IMAP Password**</label>
      <input
        type="password"
        id="imapPassword"
        placeholder="Enter your IMAP password"
        value={imapPassword}
        onChange={(e) => setImapPassword(e.target.value)}
        className="form-control w-50" 
        required
      />
      <br />
      <button onClick={handleRegister} className="btn btn-success w-50 mb-3">REGISTER</button>
      <p>
        Already have an account? <Link to="/login">Click here</Link> to login.
      </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
