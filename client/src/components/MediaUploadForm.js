import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { ImageUploadField } from './ImageUpload.js'
import { getTokenFromLocalStorage } from '../helpers/auth'
import Container from 'react-bootstrap/esm/Container'

const MediaUploadForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_to_upload: '',
    video: false,
    screenshot: false,
    games: '',
  })

  const handleImageUrl = (url) => {
    setFormData({ ...formData, file_to_upload: url })
  }

  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    fileToUpload: '',
    games: '',
  })

  const handleChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    setFormData({ ...formData, [event.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // prevent reload
    try {
      console.log(getTokenFromLocalStorage())
      await axios.post('/api/media/', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })

      navigate('/')
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <Container className="form-page">
      <Form className="mt-4" onSubmit={handleSubmit}>
        <h2>Upload Form</h2>
        {/* Title */}
        <Form.Group className="mb-2">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={formData.title}
          />
          {/* {formErrors.title && <Form.Text>{formErrors.title}</Form.Text>} */}
        </Form.Group>

        {/* Media description */}
        <Form.Group className="mb-2">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="description"
            placeholder="Your log description"
            defaultValue={formData.description}
          />
          {/* {formErrors.description && (
            <Form.Text>{formErrors.description}</Form.Text>
          )} */}
        </Form.Group>

        {/* Game id field */}
        <Form.Group>
          <Form.Label htmlFor="games">Please choose game ID</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="number"
            name="games"
            defaultValue={formData.games}
          />
          {/* {formErrors.games && <Form.Text>{formErrors.games}</Form.Text>} */}
        </Form.Group>
        {/* Video & Screenshot checkboxes */}
        <div className="video-screenshot-upload">
          <div className="field">
            <label className="checkbox label">
              Video
              <input
                type="checkbox"
                name="video"
                checked={formData.video}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="field">
            <label className="checkbox label">
              Screenshot
              <input
                type="checkbox"
                name="screenshot"
                checked={formData.screenshot}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className="form-bottom">
          <ImageUploadField
            name="file_to_upload"
            handleImageUrl={handleImageUrl}
          />

          <Button onClick={handleSubmit} type="button" className="primary">
            Confirm
          </Button>
        </div>
      </Form>
    </Container>

    // <form className="upload-form" onSubmit={handleSubmit}>
    //   <h2>Upload Form</h2>
    //   <div className="form-group">
    //     <label className="label">Title</label>
    //     <div className="control">
    //       <input
    //         className="input"
    //         name="title"
    //         value={formData.title}
    //         onChange={handleChange}
    //       />
    //     </div>
    //   </div>

    //   <div className="field">
    //     <label className="form-group">Description</label>
    //     <div className="control">
    //       <input
    //         className="input"
    //         name="description"
    //         value={formData.description}
    //         onChange={handleChange}
    //       />
    //     </div>
    //   </div>

    //   <div className="field">
    //     <label className="checkbox label">
    //       Video
    //       <input
    //         type="checkbox"
    //         name="video"
    //         checked={formData.video}
    //         onChange={handleChange}
    //       />
    //     </label>
    //   </div>

    //   <div className="field">
    //     <label className="checkbox label">
    //       Screenshot
    //       <input
    //         type="checkbox"
    //         name="screenshot"
    //         checked={formData.screenshot}
    //         onChange={handleChange}
    //       />
    //     </label>
    //   </div>

    //   <div className="field">
    //     <label className="form-group">Game to Upload to!</label>
    //     <div className="control">
    //       <input
    //         className="input"
    //         type="number"
    //         name="games"
    //         value={formData.games}
    //         onChange={handleChange}
    //       />
    //     </div>
    //   </div>

    //   <ImageUploadField name="file_to_upload" handleImageUrl={handleImageUrl} />

    //   <Button onClick={handleSubmit} type="button" className="btn btn-dark">
    //     Confirm
    //   </Button>
    // </form>
  )
}

export default MediaUploadForm