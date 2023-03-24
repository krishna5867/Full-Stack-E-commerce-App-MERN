import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ Component }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        let loggedIn = localStorage.getItem('user')
        if (!loggedIn) {
            navigate('/login')
        }
        // console.log(loggedIn);
    })
    return (
        <>
            <Component />
        </>
    )
}
export default PrivateRoute;