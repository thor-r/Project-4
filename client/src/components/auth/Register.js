import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap 
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {
    // navigate
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        profile_name: '',
        profile_image: '',
        bio: '',
        password: '',
        password_confirmation: '',
    })

    const [formErrors, setFormErrors] = useState({
        email: '',
        profile_name: '',
        profile_image: '',
        bio: '',
        password: '',
        password_confirmation: '',
    })

    const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post('/api/register', formData)
        navigate('/login')
    } catch (err) {
        setFormErrors(err.response.data.errors)
    }
    }


    return (
        <Container className="form-page">
        <Form onSubmit={handleSubmit} className="mt-4">
        <h2>Register</h2>

        {/* Email */}
        <Form.Group className='mb-2'>
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control onChange={handleChange}
            type="email"
            name="email" 
            placeholder="Email"
            defaultValue={FormData.email}
            />
            {formErrors.email && <Form.Text>{formErrors.email}</Form.Text>}
        </Form.Group>

        {/* Profile Name */}
        <Form.Group className='mb-2'>
            <Form.Label htmlFor='profile_name'>Profile Name</Form.Label>
            <Form.Control onChange={handleChange}
            type="text" 
            name="profile_name" 
            placeholder="Profile name"
            defaultValue={formData.profile_name}
            />
            {formErrors.profile_name && (
                <Form.Text>{formErrors.profile_name}</Form.Text>
            )}
        </Form.Group>

          {/* Profile Image */}
        <Form.Group className='mb-2'>
            <Form.Label htmlFor='profile_image'>Profile image</Form.Label>
            <Form.Control onChange={handleChange}
                type="text" 
                name="profile_image" 
                placeholder="Please upload your profile image"
                defaultValue={formData.profile_image}
            />
            {formErrors.profile_image && (
                <Form.Text>{formErrors.profile_image}</Form.Text>
            )}
        </Form.Group>
        
        {/* Bio */}
        <Form.Group className='mb-2'>
            <Form.Label htmlFor='bio'>Bio</Form.Label>
            <Form.Control onChange={handleChange}
                type="text" 
                name="bio" 
                placeholder="Bio"
                defaultValue={formData.bio}
            />
            {formErrors.bio && (
                <Form.Text>{formErrors.bio}</Form.Text>
            )}
        </Form.Group>

        {/* Password */}
        <Form.Group className='mb-2'>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control onChange={handleChange}
            type="password" 
            name="password" 
            placeholder="Password"
            defaultValue={formData.password}
            />
            {formErrors.password && (
                <Form.Text>{formErrors.password}</Form.Text>
            )}
        </Form.Group>

        {/* Password Confirmation */}
        <Form.Group className='mb-2'>
            <Form.Label htmlFor="password_confirmation">Confirm Password</Form.Label>
            <Form.Control onChange={handleChange}
            type="password" 
            name="password_confirmation" 
            placeholder="Confirm Password" 
            defaultValue={formData.password_confirmation}
            />
            {formErrors.password_confirmation && (
                <Form.Text>{formErrors.password_confirmation}</Form.Text>
            )}
        </Form.Group>

        {/* Submit */}
        <Form.Group className='text-center mt-4'>
            <Button variant="primary" type="submit">Submit</Button>
        </Form.Group>
    </Form>
    </Container>
    )
}

export default Register