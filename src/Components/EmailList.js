
import React from 'react';
import { Link } from 'react-router-dom';

function EmailList({ emails }) {
  return (
    <div>
      {emails.map((email) => (
        <div key={email.id} className='d-flex justify-content-between'>
          <div className='text-start mb-2'>
          <strong>From:</strong> {email.from}
          <br />
          <strong className='pb-2'>Subject:</strong> {email.subject}
          <hr></hr>
          </div>
          <div><Link to={`/view/${email._id}`}><button className='btn btn-info'>View</button> <hr/></Link></div>
         
        </div>
      ))}
    </div>
  );
}

export default EmailList;
