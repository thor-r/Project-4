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



    return (
        <>
            <h1>This is the {game.name} page</h1>
          {/* <div className='media-container'>{game.media}</div>
            <div className="card">
                <img className="card-img-top" src={game.image} alt="Card cap" />
                    <div className="card-body">
                        <h5 className="card-title">{game.name}</h5>
                    </div>
            </div> */}
            <div className="gameProfile">
            <Card className="info-card">
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <div className="profile_image_container"><img src={game.image} alt={game.name} /></div>
                </Card.Body>
              </Card>
              </div>
        </>
    )
}






export default GameDetail