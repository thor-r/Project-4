import React, { useEffect } from 'react'
import axios from 'axios'
<<<<<<< HEAD

function App() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/media/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return <h1>Hello World</h1>
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import SiteNavbar from './components/SiteNavbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Profile from './components/Profile'
import GameList from './components/GameList'
import GameDetail from './components/GameDetail'
import MediaDetail from './components/MediaDetail'
import Register from './components/auth/Register'
import Login from './components/auth/Login'



function App() {
    return (
        <div className='site-wrapper'>
            <BrowserRouter>
                <SiteNavbar />

                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/games" element={<GameList />} />
                    <Route path="/gamedetail" element={<GameDetail />} />
                    <Route path="/mediadetail" element={<MediaDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    

                </Routes>

                <Footer />
            </BrowserRouter>



        </div>
    )
>>>>>>> development
}

export default App
