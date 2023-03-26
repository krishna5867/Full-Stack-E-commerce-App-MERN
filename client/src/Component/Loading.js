import React from 'react'
import { Spinner } from 'reactstrap';

const Loading = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="danger" />&nbsp; <h2>Loading...</h2>
            </div>
        </>
    )
}

export default Loading;
