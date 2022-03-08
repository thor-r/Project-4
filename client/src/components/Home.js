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
// import FormControl from 'react-bootstrap/FormControl'
// import { BsSearch } from 'react-icons/bs'


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

    console.log("games --->",  games)

    const handleChange = (event) => {
      const regxsearch = new RegExp(event.target.value, 'i')
      console.log(regxsearch)
      const filteredGames = games.filter(game =>{
          return regxsearch.test(game.name) || game.genres.some(
            genre => regxsearch.test(genre.name)
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
        SQUAD UP WITH FRIENDS IN DIFFERENT TIME ZONES. MEET UP WITH REAL PEOPLE AT VIRTUAL EVENTS. CREATE, PLAY AND EXPLORE, TOGETHER FROM WHEREVER, ON QUEST 2.
        </h4>
          </div>
          <div className="home-buttons-1">
          <Link to={`/games`}><Button><strong>UPLOAD</strong></Button></Link>
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
    {/* <Carousel.Caption>
      <h5>First slide label</h5>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.thqnordic.com/sites/default/files/games/headers/Header_6.png"
      alt="Second slide"
    />
    {/* <Carousel.Caption>
      <h5>Second slide label</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.thqnordic.com/sites/default/files/games/headers/Header_18.png"
      alt="Third slide"
    />
    {/* <Carousel.Caption>
      <h5>Third slide label</h5>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
</Carousel>
<div className='tag_form_container'>
          <Form className='tag_form' onChange={handleChange}>
            <Form.Control
              aria-describedby="passwordHelpBlock" type='text' id='tagsubmit' placeholder="Search Game by Name or Tag" onChange={event => {
                setTagSearchTerm(event.target.value)
              }} />
          </Form>
        </div>
        {updatedGames && updatedGames.filter((games) => {
          if (searchTerm === '') {
            return updatedGames
          } else if (games.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return updatedGames
          }
        }).map(game => {
          const { image, id } = game
          return (
            <div className='game-container'>

            
            <Col key={id} md="6" lg="4" className="game mb-4">
              <Card className="h-100"> 
              <Link to={`/games/${game.id}`} id="game_card_link"> 
                {/* <Card.Header><h3>{name}</h3>
                </Card.Header> */}
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
                  {game.genres ?
                    game.genres.map((genre, id) => {
                      return (
                        <p>{genre.name}</p>
                      )
                    }) : <p>No genres yet</p>}
                </Card.Footer>
              </Card>
            </Col>

            </div>
          )
        })}
      </Container>
    </>
    )
}

export default Home