import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EmailView() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState(null);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyData, setReplyData] = useState({
    to: '',
    subject: '',
    text: ''
  });

  useEffect(() => {
    fetchEmail();
  }, []);

  const fetchEmail = async () => {
    try {
      const response = await axios.get(`https://mocdt-backend-task-x5ie.vercel.app/api/emails/${id}`);
      setEmail(response.data);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  const handleDeleteEmail = async () => {
    try {
      await axios.delete(`https://mocdt-backend-task-x5ie.vercel.app/api/emails/${id}`);
      navigate('/'); 
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const handleOpenReplyModal = () => {
    setReplyModalOpen(true);
  };

  const handleCloseReplyModal = () => {
    setReplyModalOpen(false);
  };

  const handleReplyInputChange = (event) => {
    const { name, value } = event.target;
    setReplyData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSendReply = async () => {
    try {
      const authToken = localStorage.getItem("emailapp");
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      };
  
      await axios.post(`https://mocdt-backend-task-x5ie.vercel.app/api/emails/reply/${id}`, {
        body: replyData.text
      }, { headers });
  
      setReplyModalOpen(false);
      console.log('Reply sent successfully');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };
  

  return (
    <div>
      {email ? (
        <div className='container pt-5'>
          <div className='d-flex justify-content-between'>
          <button onClick={() => navigate('/')} className='btn btn-primary h-25 pt-2'>Back</button>
          <h2 className='pt-2 text-center'>Email Details</h2>

          </div>
          <p>
             <input
                className='form-control'
                value={"From:" + email?.from}
              />            
            </p>
          <p>
              <input
                className='form-control'
                value={"Subject:" + email?.subject}
              />             
            </p>
            
          <p>
          <textarea
                value={"Text:" + email?.body}
                className='form-control'
                cols={10}
                rows={7}
          />
            </p>
          <button onClick={handleOpenReplyModal} className='btn btn-success'>Reply</button>
          <button onClick={handleDeleteEmail} className='btn btn-danger ms-2'>Delete</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Reply Modal */}
      <div className={`modal ${replyModalOpen ? 'd-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reply to Email</h5>
              <button type="button" className="close btn btn-danger" onClick={handleCloseReplyModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="email"
                name="to"
                className='form-control'
                placeholder="To"
                value={email?.from}
                onChange={handleReplyInputChange}
              />
              <input
                type="subject"
                className='form-control mt-2'
                name="subject"
                placeholder="Subject"
                value={email?.subject}
                onChange={handleReplyInputChange}
              />
              <textarea
                name="text"
                className='form-control mt-2'
                placeholder="Message"
                value={replyData.text}
                onChange={handleReplyInputChange}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseReplyModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSendReply}>Send Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailView;
