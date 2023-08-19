import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader2 = () => {
    return (
        <div className='container mx-auto text-center d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Spinner animation="grow" />
        </div>
    );
};

export default Loader2;