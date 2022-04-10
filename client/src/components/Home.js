import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import Stack from 'react-bootstrap/Stack'
import Image from 'react-bootstrap/Image'
import GetReadyImg from '../images/GetReady1.png'
import LogBestImg from '../images/LogYourBest.gif'
// import FormControl from 'react-bootstrap/FormControl'

const Home = () => {

  const [games, setGames] = useState([])
  const [updatedGames, setUpdatedGames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [tagSearchTerm, setTagSearchTerm] = useState('')
  const [hasError, setHasError] = useState({ error: false, message: '' })

  const [five, setFive] = useState([])

  useEffect(() => {
    const getGames = async () => {
      try {
        const { data } = await axios.get('/api/games/')
        setGames(data)
        setUpdatedGames(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getGames()
  }, [])

  console.log('games --->', games)

  const handleChange = (event) => {
    const regxsearch = new RegExp(event.target.value, 'i')
    console.log(regxsearch)
    const filteredGames = games.filter((game) => {
      return (
        regxsearch.test(game.name) ||
        game.genres.some((genre) => regxsearch.test(genre.name))
      )
    })
    console.log('f', filteredGames)
    setUpdatedGames(filteredGames)
  }

  useEffect(() => {
    const getFive = async () => {
      try {
        const { data } = await axios.get('/api/media/')
        setFive(data)
        console.log('RETURNED MEDIAS ------>',data)
      } catch (err) {
        console.log(err)
      }
    }
    getFive()
    
  }, [])
  

  const topFiveMedias = () => {
    if (five) {
      five.sort((a,b) => a.views - b.views)
    }
  }
  console.log('SORTED MEDIA ---------->',five.sort)

  return (
    <>
      <Container fluid id="home-container">
        <Row>
          <div className="home-content-1">
          <div>
          <img src={GetReadyImg} className="getreadyimage" alt="getreadylog"></img>
          </div>
          <img src={LogBestImg} className="logbestimage" alt="logbest"></img>
          </div>
          <div className="home-buttons-1">
            <Link to={`/upload`}>
              <Button>
                <strong>UPLOAD</strong>
              </Button>
            </Link>
            <Link to={`/games`}>LEARN MORE →</Link>
          </div>
        </Row>
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.thqnordic.com/sites/default/files/games/headers/wreckfest_header.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.thqnordic.com/sites/default/files/games/headers/Header_6.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.thqnordic.com/sites/default/files/games/headers/Header_18.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <Form.Group className="tag_form" onChange={handleChange}>
          <Form.Control
            aria-describedby="passwordHelpBlock"
            type="text"
            id="tagsubmit"
            placeholder=" 🔍 Search games or tags "
            onChange={(event) => {
              setTagSearchTerm(event.target.value)
            }}
          />
        </Form.Group>

        <Row className="games-show-row">

        <span id="most-viewed">MOST VIEWED LOGS</span>

        {topFiveMedias()}
      {five.map((media, i) => {
        if (i <= 4) {
          return (
            
            <Card className="games-show-card">
            
                <Link to={`/mediadetail/${media.id}`}>
              <video className="video-container" src={media.file_to_upload} width="315" height="250" controls></video>
            </Link>
            <div><span className='home-views'>Views: {media.views}</span> <span className='home-owner'>{media.owner.profile_name}</span></div>
          
            
            

          
                
              
            
              
            
            </Card>
          )
        } else {
          console.log("no medias")
        }
      })}
        


    


          {updatedGames &&
            updatedGames
              .filter((games) => {
                if (searchTerm === '') {
                  return updatedGames
                } else if (
                  games.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return updatedGames
                }
              })
              .map((game) => {
                const { image, id } = game
                return (
                  <>
                  <Card className="games-show-card">

                    <Link to={`/games/${game.id}`} id="game_card_link">
                      <Card.Img variant="top" src={image} />
                    </Link>
                  
                    <Card.Body>

                      <Stack gap={1}>
                        {game.genres ? (
                          game.genres.map((genre, id) => {
                            return (
                              <Button className="tags-buttons">
                                {genre.name}
                              </Button>
                            )
                          })
                        ) : (
                          <Button className="tags-buttons">No tags yet</Button>
                        )}
                      </Stack>

                    </Card.Body>

                  </Card>
                  </>
                )
              })}
        </Row>

        {/* <Row className="games-show-row">
          {updatedGames &&
            updatedGames
              .filter((games) => {
                if (searchTerm === '') {
                  return updatedGames
                } else if (
                  games.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return updatedGames
                }
              })
              .map((game) => {
                const { image, id } = game
                return (
                  <Card className="games-show-card">
                    <Link to={`/games/${game.id}`} id="game_card_link">
                      <Card.Img variant="top" src={image} />
                    </Link>
                    <Card.Body>
                      <Stack gap={1}>
                        {game.genres ? (
                          game.genres.map((genre, id) => {
                            return (
                              <Button className="tags-buttons">
                                {genre.name}
                              </Button>
                            )
                          })
                        ) : (
                          <Button className="tags-buttons">No tags yet</Button>
                        )}
                      </Stack>
                    </Card.Body>
                  </Card>
                )
              })}
        </Row> */}
      </Container>
    </>
  )
}

export default Home