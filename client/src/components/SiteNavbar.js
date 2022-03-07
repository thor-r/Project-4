import React from 'react'
// import { Link } from 'react-router-dom'

//bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { MdLogin } from 'react-icons/md'
import { GiArchiveRegister } from 'react-icons/gi'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import { IoGameController } from 'react-icons/io5'

const SiteNavbar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/"><span><IoGameController /></span> Meta Quest</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/register"> <GiArchiveRegister /> Register</Nav.Link>
                        <Nav.Link eventKey={2} href="/login"> <MdLogin /> Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default SiteNavbar