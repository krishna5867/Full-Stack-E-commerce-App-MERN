import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ Component }) {
    const navigate = useNavigate();
    let logindata = localStorage.getItem("token")
    useEffect(() => {
        if (!logindata) {
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