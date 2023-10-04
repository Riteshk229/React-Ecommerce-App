import { useState } from "react"
import {
  FormControl,
  Box,
  Input,
  InputLabel,
  Typography,
  Button
} from "@mui/material"
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { addProductToDB } from "../features";

export default function Add_Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState('');
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleAddProduct = () => {
    if (!title && !rating && !price) {
      setTitle("");
      setPrice("");
      setRating("");
      setDescription("");

      toast.warn("Please enter all the required fields to add Product ..!!");
      return
    }
    
    if (rating < 0 || rating > 5) {
      toast.warn("Rating should be in between 0 & 5");
    }

    const newProduct = {
      title: title,
      price: price,
      description: description,
      rating: rating,
      image: !image
      ? "https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg"
        : image
      }
    
      toast.promise(
        dispatch(addProductToDB(newProduct)),
        {
          pending: 'Product is being Added..!!',
          success: 'Produuct Added..!!',
          error: 'Error in Adding Product..!!!'
        }
    )
      navigate('/')
    }
    
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center"
      }}>
      <Box
        sx={{
          height: 450,
          maxWidth: 800,
          ml: 4, mt: 4, mb: 1, p: 1,
          }}
      >
        <Typography variant="h4"  m={2}>
          Add Product
        </Typography>

        <FormControl fullWidth variant="standard" sx={{ mb: 3 , p: 2 , width : "90%"}}> 
          <InputLabel sx={{ fontWeight: 600, fontSize: 20 , p: 2}}> Product Name *</InputLabel>                       
          <Input                           
            name="title"                         
            defaultValue={title}                          
            onChange={(e) => setTitle(e.target.value)}
            required
          /> 
          </FormControl>
                  
        <FormControl sx={{ mb: 3 , p: 2 }}>
          <InputLabel sx={{ fontWeight: 600, fontSize: 20 }}> Price *</InputLabel>                       
          <Input                           
            name="price" 
            defaultValue={price}                          
            onChange={(e) => setPrice(parseFloat(e.target.value / 30))}
            required
            />          
        </FormControl>
                  
        <FormControl sx={{ mb: 3 , p: 2 }}>
          <InputLabel sx={{ fontWeight: 600, fontSize: 20  }}>Rating *</InputLabel>                       
          <Input                           
            name="rating"                         
            defaultValue={rating}                          
            onChange={(e) => setRating(parseFloat(e.target.value))}  
            required
          />
        </FormControl>
        
        <FormControl
          sx={{
                position: "relative",
                mb: 3, p: 2,
                }}>
                           
          <Button sx={{ position: 'absolute',height: "100%",width:200 }}   
            component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload file                           
            <VisuallyHiddenInput type="file" onChange={handleImageChange} />                       
          </Button>
        </FormControl>
                    
        <FormControl fullWidth sx={{ mb: 3 , p: 2 ,width : "90%"}}>
          <InputLabel sx={{ fontWeight: 600, fontSize: 20 }}> Description </InputLabel>                       
          <Input                           
            name="description"                         
            defaultValue={description}                          
            onChange={(e) => setDescription(e.target.value)}                       
          />  
        </FormControl>

        <Button variant="contained"
          onClick={handleAddProduct}
          sx={{
          backgroundColor: "orangered",
          ml: 2
          }}>
          Add Product
        </Button>
      </Box>
    </Box>
  )
}
