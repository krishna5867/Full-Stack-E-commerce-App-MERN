import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height: '50vh'}}>
        <h2>404 ! PageNotFound</h2>
        <button className=' mt-4 btn btn-dark'> <Link to='/' className='text-decoration-none text-white'>Home</Link></button>
        </div>
        </>
    )
}

export default PageNotFound