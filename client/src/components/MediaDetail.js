import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getTokenFromLocalStorage, getPayload, userIsAuthenticated } from '../helpers/auth'

const MediaDetail = () => {
  const { mediaId } = useParams()
  const { id } = useParams()

  const navigate = useNavigate()

  const [media, setMedia] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })

  const [mediaOwner, setMediaOwner] = useState([])
  // const [hasError, setHasError] = useState({ error: false, message: '' })

  const [formData, setFormData] = useState({
    text: '',
    media: '',
  })

  const [formErrors, setFormErrors] = useState({
    text: '',
    media: '',
  })


  useEffect(() => {
    const getMedia = async () => {
      try {
        const { data } = await axios.get(`/api/media/${mediaId}`)
        setMedia(data)
        setMediaOwner(data.owner)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getMedia()
  }, [mediaId])

  console.log('media', media)
  console.log('media/data.owner', mediaOwner)

  const deleteMedia = async () => {
    try {
      await axios.delete(`/api/media/${mediaId}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate('/')
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  const userIsOwner = () => {
    const payload = getPayload()
    if (!payload) return
    return media.owner === payload.sub
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/comments/`, formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      window.location.reload()
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  const deleteComment = async () => {
    try {
      await axios.delete(`/api/commments/${id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      window.location.reload()
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }


  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  

  return (
    // media.video === true ?
    <>
      <h1>This is the {media.title} page</h1>
      <p>{media.description}</p>
      <p>{mediaOwner.profile_name}</p>
      <div className="owner_image_container"><img src={mediaOwner.profile_image} alt={mediaOwner.name} /></div>
      <p>{mediaOwner.bio}</p>


      <div className="mediaProfile">
        <Card className="info-card">
          <Card.Body>
            <Card.Title>{media.title}</Card.Title>
            <Card.Title>Uploaded at {media.created_at}</Card.Title>
            <Card.Title>Views {media.views} </Card.Title>
            <Card.Title></Card.Title>
            <div className="profile_image_container">
              <video className="single-video" src={media.file_to_upload} width="350" height="250" controls></video>
              </div>
          </Card.Body>
        </Card>
      </div>

      <div className="media-info">
        {media.comments ? 
          media.comments.map((comment, id) => {
            return (
              <>
                <Card className="comment-profile-card">
                  <Card.Body>
                  <p>{comment.owner.profile_name} says</p>
                  <div className="comment_owner_image_container"><img src={comment.owner.profile_image} alt={comment.owner.profile_name} /></div>
                    <p>{comment.text}</p>
                  </Card.Body>
                </Card>
                {userIsAuthenticated() ? 
                <div className="buttons mb-4">
                  <Button variant='danger' onClick={deleteComment}>Delete Comment</Button>
                </div>
                :
                <p>login to delete comment</p>
              }
              </>
            )
          }) : <p>No comments yet</p>}
      </div>
      <Form className='mt-4'>
              <Form.Group className='mb-2'>
                <Form.Label htmlFor='text'><span className='comment-text'>Enter your Comment Here</span></Form.Label>
                <Form.Control onChange={handleChange} type="text" name="text" placeholder="Comment text" />
              </Form.Group>
            </Form>

              <div className='click-add'>Click to add your comment</div>
            <div className="comment-submit">
              <Button onClick={handleSubmit} className='btn-comment' type="submit">
                <Form.Control className='bot-box' onMouseEnter={handleChange} type="number" min="0" max="100" name="media" placeholder='Post your Comment' defaultValue={media.id}/></Button>
            </div>

            {/* <div className='click-add'>Click to add your comment</div>
            <div className="comment-submit">
              <Button onClick={handleSubmit} variant="primary" type="submit">
                <input className='bot-box' onMouseEnter={handleChange} type="number" min="0" max="100" name="media" placeholder='Post your Comment' defaultValue={media.id}/></Button>
            </div> */}
      
      {userIsAuthenticated() ?
        <div className="buttons mb-4">
          <Button variant='danger' onClick={deleteMedia}>Delete Media</Button>
        </div>
        :
        <div></div>
      }
            

            

    </>
    // //This is the ternary point for video or images 
    // //Make sure the classNames and divs are the same on both sides of this point for styling!!!

    // :
    // <>
    //   <h1>This is the {media.title} page</h1>
    //   <p>{media.description}</p>
    //   <p>{mediaOwner.profile_name}</p>
    //   <div className="owner_image_container"><img src={mediaOwner.profile_image} alt={mediaOwner.name} /></div>
    //   <p>{mediaOwner.bio}</p>


    //   <div className="mediaProfile">
    //     <Card className="info-card">
    //       <Card.Body>
    //         <Card.Title>{media.title}</Card.Title>
    //         <Card.Title>Uploaded at {media.created_at}</Card.Title>
    //         <Card.Title>Views {media.views} </Card.Title>
    //         <Card.Title></Card.Title>
    //         <div className="profile_image_container">
    //           <img className="image_container" src={media.file_to_upload} alt={media.title} />
    //           </div>
    //       </Card.Body>
    //     </Card>
    //   </div>

    //   <div className="media-info">
    //     {media.comments ? 
    //       media.comments.map((comment, id) => {
    //         return (
    //           <>
    //             <Card className="comment-profile-card">
    //               <Card.Header> User Commented On This</Card.Header>
    //               <Card.Body>
    //                 <p>{comment.owner.profile_name} says</p>
    //               <div className="comment_owner_image_container"><img src={comment.owner.profile_image} alt={comment.owner.profile_name} /></div>
    //                 <p>{comment.text}</p>
    //               </Card.Body>
    //             </Card>
    //           </>
    //         )
    //       }) : <p>No comments yet</p>}
    //   </div>
    //   <Form className='mt-4'>
    //           <Form.Group className='mb-2'>
    //             <Form.Label htmlFor='text'>Enter Your Comment Here</Form.Label>
    //             <Form.Control onChange={handleChange} type="text" name="text" placeholder="Comment text" />
    //           </Form.Group>
    //           <Form.Group className='mb-2'>
    //             <Form.Label htmlFor="media">Check you are not a Bot : Enter the Number Below</Form.Label>
    //             <Form.Control onChange={handleChange} type="number" min="0" max="100" name="media" placeholder={media.id} />
    //           </Form.Group>
    //         </Form>
    //         <div className="profile-buttons">
    //           <Button onClick={handleSubmit} variant="primary" type="submit">Post Your Comment</Button>
    //         </div>

    //   </>
  )
}

export default MediaDetail