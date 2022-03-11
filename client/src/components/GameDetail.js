import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams, Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import ConsoleLogImg from '../images/ConsoleLog1.gif'

const GameDetail = () => {
  
  const { gameId } = useParams()
  const [game, setGame] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })

  const { mediaId } = useParams()
  const [media, setMedia] = useState([])

  useEffect(() => {
    const getGame = async () => {
      try {
        const { data } = await axios.get(`/api/games/${gameId}`)
        setGame(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }

    getGame()
  }, [gameId])

  console.log('game', game)

  useEffect(() => {
    const getMedia = async () => {
      try {
        const { data } = await axios.get('/api/media/')
        setMedia(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getMedia()
  }, [])

  return (
    <>
      <h1>{game.name}</h1>

      <div className="gameProfile">
        <Card className="info-card">
          <Card.Body>
            {/* <Card.Title>{game.name}</Card.Title> */}
            <div className="profile_image_container">
              <img className ="fluid" src={game.image} alt={game.name} />
              <img src={ConsoleLogImg} className="consoleimage" alt="animated consolelog"></img>
            </div>
          </Card.Body>
          
        </Card>
      </div>

      <div className="media-info">
        {game.medias ? (
          game.medias.map((media, id) => {
            return (
              // media.video === true ?
              <>
                <Card className="media-profile-card">
                  <Card.Body>
                    <div className="media_image_container">
                      <Link
                        to={`/mediadetail/${media.id}`}
                        className="media-title"
                      >
                        {media.title}{' '}
                      </Link>
                      <br></br>
                      <video className="video-container" src={media.file_to_upload} width="350" height="250" controls></video>
                      <br></br>
                      <span className="media-description">
                        {media.description}
                      </span>{' '}
                      <span className="views-container">
                        {media.views} Views
                      </span>{' '}
                      
                        {' '}
                        Uploaded by <span className="uploadedby-container">{media.owner.profile_name}</span>
                      {' '}
                      <span className="createdat-container">
                        {' '}
                        Uploaded at {media.created_at}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </>
              //This is the ternary point for video or images
              //Make sure the classNames and divs are the same on both sides of this point for styling!!!
              //   :
              //   <>
              //     <Card className="media-profile-card">
              //       <Card.Body>
              //         <div className="media_image_container">
              //           <Link to={`/mediadetail/${media.id}`} className='media-title'>{media.title} </Link>
              //           <br></br>
              //           <img className="image-container" src={media.file_to_upload} alt={media.title} />
              //           <br></br>
              //           <span className='media-description'>{media.description}</span> <span className='views-container'>{media.views} Views</span> <span className='uploadedby-container'> Created by {media.owner.profile_name}</span> <span className='createdat-container'> Uploaded at {media.created_at}</span>
              //         </div>
              //       </Card.Body>
              //     </Card>
              //   </>
            )
          })
        ) : (
          <p>No media yet</p>
        )}
      </div>
    </>
  )
}

export default GameDetail










