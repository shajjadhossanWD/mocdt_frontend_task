import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function ProfilePage () {
  const [imapPassword, setImapPassword] = useState('');
  const { currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

 


  const handleImapPasswordUpdate = async () => {
    try {
      const token = localStorage.getItem("emailapp"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
      await axios.put('https://mocdt-backend-task-x5ie.vercel.app/api/v1/user/update-imap-password', { imapPassword }, config);
      alert('IMAP password updated successfully');
      navigate("/");
    } catch (error) {
      console.error('Error updating IMAP password:', error);
    }
  };
  

  return (
    <div className='container pt-5'>
      <h2 className='mt-4 mb-3'>PROFILE</h2>
      <div className='input_group'>
        <label>Email:</label>
        <input type="text" className='form-control w-75' value={currentUser?.email} readOnly />

        <label>Name:</label>
        <input type="text" className='form-control w-75' value={currentUser?.name} readOnly />

      <label>IMAP Password:</label>
      <p className='d-flex w-100 justify-content-center' >
        <input
          type="password"
          className='form-control w-50'
          value={imapPassword}
          onChange={(e) => setImapPassword(e.target.value)}
        />
        <button className='btn btn-info' onClick={handleImapPasswordUpdate}>UPDATE</button>
      </p>
      <Link to="/"><button className='btn btn-primary ms-2'>BACK TO HOME</button></Link>

      </div>
    </div>
  );
}

export default ProfilePage;
