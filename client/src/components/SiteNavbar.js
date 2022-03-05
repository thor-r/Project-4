import React from 'react'
import { Link } from 'react-router-dom'

//bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const SiteNavbar = () => {

    return (
        <div className='nav-style'>
            <div className='nav-logo'>
                <Navbar.Brand>
                    <Link className='btn btn-logo' to='/'> Home </Link>
                </Navbar.Brand>
            </div>

            <div className='nav-profile'>
                <Nav.Item>
                    <Link className='btn btn-nav' to="/profile">Profile</Link>
                </Nav.Item>
            </div>

            <div className='nav-register'>
                <Nav.Item>
                    <Link className='btn btn-nav' to="/register">Register</Link>
                </Nav.Item>
            </div>

            <div className='nav-login'>
                <Nav.Item>
                    <Link className='btn btn-nav' to="/login">Login</Link>
                </Nav.Item>
            </div>

            <div className='nav-offers'>
                <Nav.Item>
                    <Link className='btn btn-nav' to="/games">Games</Link>
                </Nav.Item>
            </div>
        
            <div className='nav-offers'>
                <Nav.Item>
                    <Link className='btn btn-nav' to="/gamedetail">Game Detail</Link>
                </Nav.Item>
            </div>

            <div className='nav-offers'>
                <Nav.Item>
                    <Link className='btn btn-nav' to="/mediadetail">Media Detail</Link>
                </Nav.Item>
            </div>

            </div>
    )
}
export default SiteNavbar