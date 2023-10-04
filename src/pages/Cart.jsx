import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { Loader } from '../components';
import {
  decreaseQuantity,
  deleteItemInCart,
  fetchProductsInCart,
  increaseQuantity

} from '../features';

const Cart = (props) => {
  const dispatch = useDispatch();
  const {getProducts,products,cartItems} = props;
  const isLoading = useSelector(state => state.cart.loading);

  useEffect(() => {
    getProducts();
  }, [cartItems]);
  
  if (isLoading) {
    <Loader/>
  }
  return (
    <>
        <Grid container spacing={2}
          sx={{
            mt: 5,
            pl: 10,
            pr: 10,
            width: "100%",
          }}
        >
          <Grid item sx={{
            width: "80%",
          }}>
            {products.map((item, index) => (
              <Card
                key={index}
                sx={{
                  position: "relative",
                  mb: 2,
                  p: 1,
                  height: 180,
                  display: "flex",
                  justifyContent: "space-around",
                }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 200,
                    objectFit: "contain",
                  }}
                  image={item.product.image}
                  alt="CartItem.jpg"
                />
                <CardContent
                  sx={{
                    width: "60%"
                  }}>
                      
                  <Typography variant='h6' mb={2} noWrap>
                    {item.product.title}
                  </Typography>

                  <Typography
                    variant='subtitle1'
                    mb={2} ml={2}
                    noWrap>
                        
                    Rs

                    <Typography
                      variant='h6'
                      ml={2}
                      component="span"
                    >
                      {Intl
                        .NumberFormat("en-US", { maximumFractionDigits: 2 })
                        .format(
                          item.product.price * 30
                        )}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      display: "flex"
                    }}
                    noWrap
                  >

                    <IconButton
                      onClick={()=> { dispatch(increaseQuantity(item.product.id)) }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  

                    <Typography variant='h5' mt={0.5} noWrap>
                      {item.quantity}
                    </Typography>


                    <IconButton
                      onClick={() => { dispatch(decreaseQuantity(item.product.id)) }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>

                  </Typography>
            
                </CardContent>
                
                    
                <IconButton
                  onClick={()=>dispatch(deleteItemInCart(index))}
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    color: 'blue',
                    '&:hover': {
                      color: 'red'
                    }
                  }}
                >
                  <DeleteIcon fontSize='large' />
                </IconButton>

              </Card>
            ))}
          </Grid>

        <Grid item
          sx={{
            width: "20%",
            textAlign: "center",
          }}>
          <Typography  variant='h6' mt={5}  >
              SubTotal ({products.length} item) :
          </Typography>
          
          <Typography variant='h4' m={3} sx={{
            display: 'flex',
            justifyContent: 'center',
           
          }}>
             <Typography  variant="" mr={3}> Rs </Typography>{
                Intl
                  .NumberFormat("en-US", { maximumFractionDigits: 2 })
                  .format(
                    products
                      .reduce((total, item) => total + item.product.price * item.quantity, 0)
                    * 30)}
            </Typography>
          </Grid>
        </Grid>
    </>
  )
}

const mapStateToProp = (state, ownProp) => {
  const { userID } = ownProp;
  const products = state.cart.products;
  const cartItems = state.cart.cartItems;

  return {
    userID,
    cartItems,
    products
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProductsInCart()),
  getCartItems: (userId) => dispatch(fetchCartItemsOfUser(userId)),

});

export default connect(mapStateToProp, mapDispatchToProps)(Cart);
