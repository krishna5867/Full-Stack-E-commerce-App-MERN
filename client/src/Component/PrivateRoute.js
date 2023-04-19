import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookie from 'js-cookie';

function PrivateRoute({ Component }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        let loggedIn = localStorage.getItem('user')
        if (!loggedIn) {
            navigate('/login')
        }
    })
    return (
        <>
            <Component />
        </>
    )
}
export default PrivateRoute;