import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

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
          const { data } = await axios.get(`/api/media/${mediaId}`)
          setMedia(data)
          console.log('media/data.owner',data.owner)
        } catch (err) {
          setHasError({ error: true, message: err.message })
        }
      }
      getMedia()
    }, [mediaId])



  return (
    <>
      <h1>This is the {game.name} page</h1>

      <div className="gameProfile">
        <Card className="info-card">
          <Card.Body>
            <Card.Title>{game.name}</Card.Title>
            <div className="profile_image_container"><img src={game.image} alt={game.name} /></div>
          </Card.Body>
        </Card>
      </div>

      <div className="media-info">
        {game.medias ?
          game.medias.map((media, id) => {
            return (
              <>
                <Card className="media-profile-card">
                  {/* <Card.Header> {media.title}</Card.Header>
                  <Card.Header> {media.description}</Card.Header> */}
                  <Card.Body>
                    <div className="media_image_container">
                    <Link to={`/mediadetail/${media.id}`}  className='media-title'>{media.title} </Link>
                    <br></br>
                    <video className="video-container" src={media.file_to_upload} width="350" height="250" controls></video>
                    <br></br>
                    <span className='media-description'>{media.description}</span> <span className='views-container'>{media.views} Views</span>
                      
                      </div>
                  </Card.Body>
                </Card>
              </>
            )
          }) : <p>No media yet</p>}
      </div>
    </>
  )
}




                


export default GameDetail









