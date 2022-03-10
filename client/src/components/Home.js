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
// import FormControl from 'react-bootstrap/FormControl'

const Home = () => {
  const [games, setGames] = useState([])
  const [updatedGames, setUpdatedGames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [tagSearchTerm, setTagSearchTerm] = useState('')
  const [hasError, setHasError] = useState({ error: false, message: '' })

  useEffect(() => {
    const getGames = async () => {
      try {
        const { data } = await axios.get('/api/games')
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

  return (
    <>
      <Container fluid id="home-container">
        <Row>
          <div className="home-content-1">
            <h2>Ready to Log</h2>
            <h4>
              SQUAD UP WITH FRIENDS IN DIFFERENT TIME ZONES. MEET UP WITH REAL
              PEOPLE AT VIRTUAL EVENTS. CREATE, PLAY AND EXPLORE, TOGETHER FROM
              WHEREVER, ON QUEST 2.
            </h4>
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