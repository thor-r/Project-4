import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap 
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
    return (
        <Container className="form-page">
            <Form className='mt-4'>
            <h2>Login</h2>
            <Form.Group className='mb-2'>
                <Form.Label htmlFor='email'>Email Address</Form.Label>
                <Form.Control type="email" name="email" placeholder='Email'/>
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" name="password" placeholder='Password' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep me logged in" />
            </Form.Group>
            <Form.Group className='mt-4 text-left'>
                <Button variant="primary" type="submit">Log in</Button>
            </Form.Group>
            </Form>
        </Container>
    )
}

export default Login