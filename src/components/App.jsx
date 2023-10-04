import { useEffect } from 'react'
import { connect} from 'react-redux'
import { Route,Routes} from 'react-router-dom'

import { Navbar } from './index'
import {
  Home,
  NotFound,
  AddProduct,
  Cart,
  Product
} from '../pages'

import {
  fetchCartItemsOfUser,
  fetchProductsFromDB,
  fetchProductsInCart,
} from '../features'

import '../assets/styles/App.css'



function App(props) {
  console.log("app", props);
  const { userID,
    getCartItems,
    getProducts,
    dispatch,
    getProductsInCart
  } = props;
  console.log("app", userID);

  useEffect(() => {    
    getProducts();
    getCartItems(userID);
    getProductsInCart();
  }, [dispatch]);

  return (
    <>
      <Navbar 
        userID={userID}
      />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/products/:productID' element={<Product />}/>
        <Route path='/add' element={<AddProduct />} />
        <Route path='/user/cart' element={<Cart userID={userID}  />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

const mapStateToProp = (state,ownProp) => {
  const { userID } = ownProp;
  return {
    userID,
  }
}

const mapDispatchToProps = (dispatch) => ({ 
  getCartItems: (id) => dispatch(fetchCartItemsOfUser(id)),
  getProducts: () => dispatch(fetchProductsFromDB()),
  getProductsInCart: () => dispatch(fetchProductsInCart())
})

export default connect(mapStateToProp,mapDispatchToProps)(App);
