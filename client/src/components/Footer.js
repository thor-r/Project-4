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
                        <h5>LinkedIn</h5>
                        <a href={'https://www.linkedin.com/in/alibeniaminali/'} id="game_card_link" target="_blank"><h6>Ali Ali</h6></a>
                        <a href={'https://www.linkedin.com/in/peter-bid/'} id="game_card_link" target="_blank"><h6>Peter Bid</h6></a>
                        <a href={'www.linkedin.com/in/thor-refoy'} id="game_card_link" target="_blank"><h6>Thor Refoy</h6></a>
                    </Col>
                    <Col xs lg="2">
                        <h5>GitHub</h5>
                        <a href={'https://github.com/alibeniaminali'} id="game_card_link" target="_blank"><h6>Ali Ali</h6></a>
                        <a href={'https://github.com/PeterBid?tab=repositories'} id="game_card_link" target="_blank"><h6>Peter Bid</h6></a>
                        <a href={'https://github.com/thor-r'} id="game_card_link" target="_blank"><h6>Thor Refoy</h6></a>
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

