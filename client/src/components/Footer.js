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
import { MdOutlineSlowMotionVideo } from 'react-icons/md'


const Footer = () => {
    return (
        <>
            <Container fluid id="footer-header">
                <Row className="footer-row">
                    <Col className="footer-title col-sm">
                        <h4><span className="logo-span"><IoGameController /></span>Console L<span className="logs-span" ><MdOutlineSlowMotionVideo /></span>gs</h4>
                    </Col>
                </Row>
                <Row id="footer">
                    <Col>
                        <Nav.Link href="/">PRODUCTS</Nav.Link>
                        <Nav.Link href="/"> ACCESSORIES</Nav.Link>
                        <Nav.Link href="/"> APPS & Games</Nav.Link>
                        <Nav.Link href="/"> SUPPORT</Nav.Link>
                    </Col>
                    <Col xs lg="2">
                        <h5>More</h5>
                        <Link to={`/`} id="game_card_link"><h6>Forums</h6></Link>
                        <Link to={`/`} id="game_card_link"><h6>Blog</h6></Link>
                        <Link to={`/`} id="game_card_link"><h6>About Us</h6></Link>
                    </Col>
                    <Col xs lg="2">
                        <h5>About</h5>
                        <Link to={`/`} id="game_card_link"><h6>Careers</h6></Link>
                        <Link to={`/`} id="game_card_link"><h6>GitHub</h6></Link>
                        <Link to={`/`} id="game_card_link"><h6>Creators</h6></Link>
                    </Col>
                </Row>
                <Row id="socials">
                    <Col xs lg="5">
                        <h5>Get News & Updates </h5>
                        <hr />
                        <ul>
                            <Link to={`/`}>< SiInstagram /></Link>
                            <Link to={`/`}>< SiTwitter /></Link>
                            <Link to={`/`}>< SiLinkedin /></Link>
                            <Link to={`/`}><VscGithub /></Link>
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