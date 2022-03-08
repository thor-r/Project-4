import React from 'react'
import { useNavigate } from 'react-router-dom'
//bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { MdLogin, MdLogout, MdOutlineSlowMotionVideo } from 'react-icons/md'
import { GiArchiveRegister } from 'react-icons/gi'
import { IoGameController } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { userIsAuthenticated } from '../helpers/auth'

const SiteNavbar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('videoclips-token')
        navigate('/')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/"><span className="logo-span"><IoGameController /></span> Console L<span className="logs-span" ><MdOutlineSlowMotionVideo /></span>gs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                {userIsAuthenticated() ?
            <Nav className="ms-auto">
                <Nav.Link href='/profile'>
                    <CgProfile className="profile-icon" />
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                    <MdLogout className="logout-icon" />Logout
                </Nav.Link>
            </Nav>
            :
            <>
                <Nav className="ms-auto">
                    <Nav.Link href="/register"> <GiArchiveRegister /> Register</Nav.Link>
                    <Nav.Link eventKey={2} href="/login"> <MdLogin /> Login</Nav.Link>
                </Nav>
            </>
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default SiteNavbar