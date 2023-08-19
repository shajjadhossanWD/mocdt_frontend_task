// components/EmailListMain.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
import EmailList from './EmailList';
import { AuthContext } from './auth/AuthContext';

function EmailListMain() {
  const [emails, setEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 5;
  const { logout, currentUser} = useContext(AuthContext);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(`https://mocdt-backend-task-x5ie.vercel.app/api/emails/recipient/${currentUser.email}`);
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
      alert("error comes")
    }
  };
  

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://mocdt-backend-task-x5ie.vercel.app/api/emails/search/by-sender/${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching emails:', error);
    }
  };

  const clearSearchResults = () => {
    setSearchResults(null);
  };

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = (searchResults || emails).slice(indexOfFirstEmail, indexOfLastEmail);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} style={{ position: 'sticky', top: 0, padding: '10px', zIndex: 1 }}>
          <div className='d-flex justify-content-between mt-4'>
          <div>
          <button className='btn btn-danger' onClick={()=>logout()}>Logout</button>
          <Link to="/profile"><button className='btn btn-primary ms-2'>Profile</button></Link>
          </div>
          <div className='d-flex'>
            <input
              type="text"
              placeholder="Search by senders email"
              value={searchQuery}
              className='searchInput form-control'
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className='btn btn-danger'>Search</button>
            {searchResults && <button onClick={clearSearchResults} className='btn btn-info'>Inbox</button>}
          </div>

          </div>
          <Link to="/compose"><button className='btn btn-success mt-3'>Send Email</button></Link>

        </Col>
      </Row>
      <Row>
        <Col xs={12} className='mt-5'>
          {currentEmails.length > 0 ? (
            <EmailList emails={currentEmails} />
          ) : (
            <p>No Emails Available</p>
          )}

        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Pagination className="d-flex justify-content-center">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: Math.ceil((searchResults || emails).length / emailsPerPage) }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil((searchResults || emails).length / emailsPerPage)}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default EmailListMain;
