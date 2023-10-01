import { useState } from 'react'
import { Route,Routes} from 'react-router-dom'

import '../assets/styles/App.css'
import Navbar from './Navbar'
import { Home,NotFound, Profile, UserProfile } from '../pages'
import Product from '../pages/Product'
import Add_Product from '../pages/Add_Product'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProductsFromDB } from '../features/productsSlice'
import Cart from '../pages/Cart'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {    
      dispatch(fetchProductsFromDB());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/userId/:userId' element={<Profile />} />
        <Route path='/product/:productID' element={<Product />}/>
        <Route path='/user/:id' element={<UserProfile />}/>
        <Route path='/add' element={<Add_Product />} />
        <Route path='/user/:userId/cart' element={<Cart/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
