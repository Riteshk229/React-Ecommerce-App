import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItemsFromDB } from '../features/cartSlice';
import { useParams } from 'react-router-dom';
import { Loader } from '../components';

export default function Cart() {
  const { userId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(fetchCartItemsFromDB(parseInt(userId)));
  }, [dispatch]);
  const list = useSelector(state => state.cart.cartItems);
  console.log(list);
  const isLoading = useSelector(state => state.cart.loading);

  if (isLoading) {
    <Loader/>
  }
  return (
    <div>Cart </div>
  )
}
