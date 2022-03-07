import React from 'react'
import { Link } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { SiInstagram, SiTwitter, SiLinkedin } from 'react-icons/si'
import { VscGithub } from 'react-icons/vsc'
import { IoGameController } from 'react-icons/io5'



const Footer = () => {
    return (
        <>
            <Container fluid id="footer-header">
                <Row className="footer-row">
                    <Col className="footer-title col-sm">
                        <h4><span><IoGameController /></span> Meta Quest</h4>
                    </Col>
                </Row>
                <Row id="footer">
                    <Col>
                        <Nav.Link href="/register">PRODUCTS</Nav.Link>
                        <Nav.Link href="/register"> ACCESSORIES</Nav.Link>
                        <Nav.Link href="/register"> APPS & Games</Nav.Link>
                        <Nav.Link href="/register"> SUPPORT</Nav.Link>
                    </Col>
                    <Col xs lg="2">
                        <h5>More</h5>
                        <Link to={`/aboutus`} id="game_card_link"><h6>Forums</h6></Link>
                        <Link to={`/aboutus`} id="game_card_link"><h6>Blog</h6></Link>
                        <Link to={`/aboutus`} id="game_card_link"><h6>About Us</h6></Link>
                    </Col>
                    <Col xs lg="2">
                        <h5>About</h5>
                        <Link to={`/aboutus`} id="game_card_link"><h6>Careers</h6></Link>
                        <Link to={`/aboutus`} id="game_card_link"><h6>GitHub</h6></Link>
                        <Link to={`/aboutus`} id="game_card_link"><h6>Creators</h6></Link>
                    </Col>
                </Row>
                <Row id="socials">
                    <Col xs lg="5">
                        <h5>Get News & Updates </h5>
                        <hr />
                        <ul>
                            <Link to={`/aboutus`}>< SiInstagram /></Link>
                            <Link to={`/aboutus`}>< SiTwitter /></Link>
                            <Link to={`/aboutus`}>< SiLinkedin /></Link>
                            <Link to={`/aboutus`}><VscGithub /></Link>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Footer

// {/* <div className="footer-bottom">
//                 <p className="text xs-center">&copy;{new Date().getFullYear()} Video Games App - London - United Kingdom</p>
//             </div> */}