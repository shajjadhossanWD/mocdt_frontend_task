import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

function ComposeEmail() {
  const [recipient, setrecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setbody] = useState('');
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    try {      
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("emailapp")}`,
        }
      };
      const emailData = {
        recipient,
        subject,
        body
      };
      await axios.post('http://localhost:5000/api/emails/send-email', emailData, config);
      
      console.log('Email sent successfully');
      alert("Email sent successfully");
      navigate("/")
    } catch (error) {
      console.error('Error sending email:', error);
      alert("Failed to send email");
    }
  };
  

  return (
    <div className='container pt-5'>
      <h2>SEND EMAIL</h2>
      <input
        type="email"
        placeholder="To"
        className='form-control'
        value={recipient}
        onChange={(e) => setrecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        className='form-control mt-3'
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <b></b>
      <textarea
        placeholder="Message"
        className='form-control mt-3'
        value={body}
        rows={7}
        onChange={(e) => setbody(e.target.value)}
      />
      <br />
      <button onClick={() => navigate('/')} className='btn btn-danger me-2'>Back</button>
      <button onClick={handleSendEmail} className='btn btn-success'>Send Email</button>
    </div>
  );
}

export default ComposeEmail;
