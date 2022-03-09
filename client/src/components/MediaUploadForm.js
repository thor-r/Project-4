import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { ImageUploadField } from './ImageUpload.js'

const MediaUploadForm = () => {

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

    const [ formErrors, setFormErrors ] = useState({
      title: '',
      description: '',
      fileToUpload: '',
      games: '',
    })

    const handleChange = event => {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
      setFormData({ ...formData, [event.target.name]: value })
    }
  
    const handleSubmit = event => {
      event.preventDefault()
      window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
    }
  
  


    return (
//       <Form onSubmit={handleSubmit} className='mt-4 upload-form'>

//     <Form.Group className='mb-2'>
//       <Form.Label htmlFor='title'>Title</Form.Label>
//       <Form.Control onChange={handleChange} type="text" name="title" placeholder="Title" defaultValue={formData.title} />
//       {formErrors.title && <Form.Text>{formErrors.title}</Form.Text>}
//     </Form.Group>

//     <Form.Group className='mb-2'>
//       <Form.Label htmlFor="description">Description</Form.Label>
//       <Form.Control onChange={handleChange} type="text" name="description" placeholder="description" defaultValue={formData.description} />
//       {formErrors.description && <Form.Text>{formErrors.description}</Form.Text>}
//     </Form.Group>

//     {/* <Form.Group className='mb-2'>
//       <Form.Label htmlFor="video">Video</Form.Label>
//       <Form.Control onChange={handleChange} type="checkbox" name="Video" placeholder="Video" checked={formData.video} />
//       {formErrors.video && <Form.Text>{formErrors.video}</Form.Text>}
//     </Form.Group>

//     <Form.Group className='mb-2'>
//       <Form.Label htmlFor="screenshot">Screenshot</Form.Label>
//       <Form.Control onChange={handleChange} type="checkbox" name="Screenshot" placeholder="Screenshot" checked={formData.screenshot} />
//       {formErrors.screenshot && <Form.Text>{formErrors.screenshot}</Form.Text>}
//     </Form.Group> */}

//     <Form.Group className='mb-2'>
//       <Form.Label htmlFor="games">What Game is your Log for?</Form.Label>
//       <Form.Control onChange={handleChange} type="number" name="games" placeholder="Enter game ID" defaultValue={formData.games} />
//       {formErrors.games && <Form.Text>{formErrors.games}</Form.Text>}
//     </Form.Group>

// <div className='field'>
//           <label className='checkbox label'>
//             Video
//             <input 
//             type="checkbox"
//             name="Video"
//             checked={formData.video}
//             onChange={handleChange}
//             />
//           </label>
//         </div>

//         <div className='field'>
//           <label className='checkbox label'>
//             Screenshot
//             <input 
//             type="checkbox"
//             name="Screenshot"
//             checked={formData.screenshot}
//             onChange={handleChange}
//             />
//           </label>
//         </div>

//     <ImageUploadField
//       name="file_to_upload"
//       handleImageUrl={handleMediaUrl}
//     />
//     <Form.Group className='text-center mt-4'>
//       <Button variant="success" type="submit">Submit</Button>
//     </Form.Group>

//   </Form>

<form className='upload-form' onSubmit={handleSubmit}>
<div className='form-group'>
  <label className='label'>Title</label>
  <div className='control'>
    <input 
      className='input'
      name="title"
      value={formData.title}
      onChange={handleChange}
      />
  </div>
</div>

<div className='field'>
  <label className='form-group'>Description</label>
  <div className='control'>
    <input 
      className='input'
      name="description"
      value={formData.description}
      onChange={handleChange}
      />
  </div>
</div>

<div className='field'>
  <label className='checkbox label'>
    Video
    <input 
    type="checkbox"
    name="video"
    checked={formData.video}
    onChange={handleChange}
    />
  </label>
</div>

<div className='field'>
  <label className='checkbox label'>
    Screenshot
    <input 
    type="checkbox"
    name="screenshot"
    checked={formData.screenshot}
    onChange={handleChange}
    />
  </label>
</div>

<div className='field'>
  <label className='form-group'>Game to Upload to!</label>
  <div className='control'>
    <input 
      className='input'
      type="number"
      name="games"
      value={formData.games}
      onChange={handleChange}
      />
  </div>
</div>

    <ImageUploadField
    name="file_to_upload"
    handleImageUrl={handleImageUrl}
  />





<Button type="button" className="btn btn-dark">Confirm</Button>
</form>

    )
}

export default MediaUploadForm