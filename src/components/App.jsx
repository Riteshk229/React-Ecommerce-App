import { useState } from 'react'
import { Route,Routes} from 'react-router-dom'

import '../assets/styles/App.css'
import Navbar from './Navbar'
import Loader from './Loader'
import { Home,NotFound, Profile } from '../pages'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/userId/:userId' element={<Profile />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
