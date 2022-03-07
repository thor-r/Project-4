import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Home = () => {

    const [games, setGames] = useState([])
    const [updatedGames, setUpdatedGames] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
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

    console.log("games --->",  games)

    const handleSubmit = () => {

    }

    return (
        <>
      <Container className='gamelist_container'>
        <Row id="row1">
        <h1>Quest is ready</h1>
        <p>SQUAD UP WITH FRIENDS IN DIFFERENT TIME ZONES. MEET UP WITH REAL PEOPLE AT VIRTUAL EVENTS. CREATE, PLAY AND EXPLORE, TOGETHER FROM WHEREVER, ON QUEST 2.</p>
        <Col>
          <Button>Buy now</Button>
          <Button>Learn more</Button>
        </Col>
        </Row>
      <h4 className="h4">Search Games</h4>
        <div className='form_container'>
          <Form className='search_form' onSubmit={handleSubmit}>
            <Form.Label htmlFor="inputPassword5">Write the Name of the game you want to find content for</Form.Label>
            <Form.Control
              aria-describedby="passwordHelpBlock" type='text' id='gamesssubmit' placeholder="My Game" onChange={event => {
                setSearchTerm(event.target.value)
              }} />
          </Form>
        </div>
        <ul className='games_list'></ul>
        {updatedGames && updatedGames.filter((games) => {
          if (searchTerm === '') {
            return updatedGames
          } else if (games.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return updatedGames
          }
        }).map(game => {
          const { name, image, id, genre } = game
          return (
            <Col key={id} md="6" lg="4" className="game mb-4">
              <Card className="h-100"> 
              <Link to={`/games/${game.id}`} id="game_card_link"> 
                <Card.Header><h3>{name}</h3>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col id="game-image-profile" sm>
                      <div className="image_container">
                        <Card.Img className="img-fluid img-thumbnail" src={image} />
                      </div>
                    </Col>   
                  </Row>
                </Card.Body>
                </Link>
                <Card.Footer className="text-center">
                  <p>{genre}tag</p>
                </Card.Footer>
              </Card>
            </Col>
          )
        })}
      </Container>
    </>
    )
}

export default Home