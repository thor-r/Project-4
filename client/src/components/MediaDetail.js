import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const MediaDetail = () => {
  const { mediaId } = useParams()

  const [media, setMedia] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })


  useEffect(() => {
    const getMedia = async () => {
      try {
        const { data } = await axios.get(`/api/media/${mediaId}`)
        setMedia(data)
        console.log('media/data.owner',data.owner)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getMedia()
  }, [mediaId])

  console.log('media', media)

  

  return (
    <>
      <h1>This is the {media.title} page</h1>
      <p>{media.description}</p>

      <div className="mediaProfile">
        <Card className="info-card">
          <Card.Body>
            <Card.Title>{media.title}</Card.Title>
            <Card.Title>Uploaded at {media.created_at}</Card.Title>
            <Card.Title>Views {media.views} </Card.Title>
            <Card.Title></Card.Title>
            <div className="profile_image_container"><img src={media.file_to_upload} alt={media.title} /></div>
          </Card.Body>
        </Card>
      </div>

      <div className="media-info">
        {media.comments ?
          media.comments.map((comment, id) => {
            return (
              <>
                <Card className="comment-profile-card">
                  <Card.Header> User Commented On This</Card.Header>
                  {/* <Card.Header> {comment.owner.profile_name}</Card.Header> */}
                  {/* <div className="comment_owner_image_container"><img src={comment.owner.profile_image} alt={owner.name} /></div> */}
                  <Card.Body>
                    <p>{comment.text}</p>
                  </Card.Body>
                </Card>
              </>
            )
          }) : <p>No comments yet</p>}
      </div>

      {/* <div className="owner-info">
        {media.owner ?
          media.owner.entires().map((owner, id) => {
            return (
              <>
                <Card className="-profile-card">
                  <Card.Header> {owner.profile_name}</Card.Header>
                  <Card.Header> {owner.bio}</Card.Header>
                  <Card.Body>
                    <div className="owner_image_container"><img src={owner.profile_image} alt={owner.name} /></div>
                  </Card.Body>
                </Card>
                <div className="buttons mb-4">
                </div>
              </>
            )
          })
          : <p>No owner yet</p>}
      </div> */}

    </>
  )
}

export default MediaDetail