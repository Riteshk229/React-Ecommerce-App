import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Box,
  Button
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
import { getProduct } from '../assets/JS';
import { Link } from 'react-router-dom';

const Cart = (props) => {
  const dispatch = useDispatch();
  const {products,cartItems} = props;
  const isLoading = useSelector(state => state.cart.loading);

  useEffect(() => {
    getProduct();
   }, [cartItems]);
  
  if (isLoading) {
    <Loader/>
  }
  return (
    <>
      {!products.length &&
        <>
        <Box
          sx={{
            width: '100vw',
            height: '90vh',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding : 5
            
          }}
        >
          <Typography variant='h3' sx={{position:'relative'}}>
            Cart is Empty. Checkout our Home page to Add items to cart.
            <Link to={'/'}>
              <Button variant='contained' sx={{
                display: 'block',
                position: 'absolute',
                left: "40%",
                fontSize: 40,
                mt:10
              }}
              >
                Home Page
              </Button>
            </Link>
          </Typography>
        </Box>
        </>
      }

      {products.length > 0 &&
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
                          item.product.price * 31
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
                      onClick={() => { dispatch(increaseQuantity(item.product.id)) }}
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
                
                    
                {/* <IconButton
                  onClick={() => dispatch(deleteItemInCart(index))}
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
                </IconButton> */}

              </Card>
            ))}
          </Grid>

          <Grid item
            sx={{
              width: "20%",
              textAlign: "center",
            }}>
            <Typography variant='h6' mt={5}  >
              SubTotal ({products.length} item) :
            </Typography>
          
            <Typography variant='h4' m={3} sx={{
              display: 'flex',
              justifyContent: 'center',
           
            }}>
              <Typography variant="" mr={3}> Rs </Typography>{
                Intl
                  .NumberFormat("en-US", { maximumFractionDigits: 2 })
                  .format(
                    products
                      .reduce((total, item) => total + item.product.price * item.quantity, 0)
                    * 31)}
            </Typography>
          </Grid>
        </Grid>
      }
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
