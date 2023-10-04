import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TextField from "@mui/material/TextField";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { styled } from '@mui/material/styles';

import { Loader } from "../components";
import { useDispatch, useSelector} from "react-redux";
import {
    fetchProductFromDB,
    editProductOnDB,
    fetchProductsFromDB,
    addItemIncart,
} from "../features";
import { toast } from "react-toastify";


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
  
const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  productID  = parseInt(useParams().productID);
    const isLoading = useSelector(state => state.product.loading);
    const product = useSelector(state => state.product.product);
    const err = useSelector(state => state.product.error);
    const [editModeActive, setEditModeActive] = useState(false);
    const [title, setTitle] = useState(product.title);
    const [image, setImage] = useState(product.image);
    const [rating, setRating] = useState(product.rating | 0);
    const [price, setPrice] = useState(product.price | 0);
    const [description, setDescription] = useState(product.description);
     
    useEffect(() => {
          
        dispatch(fetchProductFromDB(productID));
        if (err.status) {
            toast.error(`${err.message}`)
            navigate('/');
        }
        setTitle(product.title);    
        setImage(product.image);
        setPrice(product.price); 
        setRating(product.rating);    
        setDescription(product.description);
          
    }, [editModeActive,dispatch]);

    const handleAddToCart = (productID) => {
        dispatch(addItemIncart({
            productId: productID,
            quantity: 1
        }))
    }

    const handleImageChange = (e) => {
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = () => {
        const editedProduct = {
            title: title,
            price: price,
            description: description,
            rating: rating,
            image: !image
            ? "https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg"
              : image
            }

        toast.promise(
            dispatch(editProductOnDB({ editedProduct, productID })),
            {
                pending: 'Edit en route..!!',
                success: 'Edit Successfull..!!',
                error: 'Error in editing product..!!!'
              }
        )
        dispatch(fetchProductsFromDB());
  
        setEditModeActive(false);
    }


    if (isLoading) {
        return <Loader/>
    }

    return (
        <>
            {editModeActive
                ? (
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            mt: 2, mb: 1, p: 1,
                            }}
                    >
                        <Box sx={{
                            position: "relative",
                            minWidth: 450,
                            mt: 3, ml: 3, p: 1,
                            backgroundColor: "#f7f7f7"
                        }}>
                            <Button sx={{ position: 'absolute',zIndex : 2 ,left: "30%", top: "40%" , }}
                                component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload file
                            <VisuallyHiddenInput type="file" onChange={handleImageChange}/>
                        </Button>
                        
                            <CardMedia component="img"
                            sx={{
                                width: 400,
                                objectFit: "contain",
                                opacity: 0.85,
                                }}
                                image={image}
                                alt="product.jpg"
                        />
                        </Box>

                        <Box
                            sx={{
                                height: 450,
                                minWidth: 800,
                                ml: 4, mt: 4, mb: 1, p: 1,
                                border: "1px solid black"
                                }}
                        >
                            <CardContent sx={{ flex: '1 0 auto', textAlign: "left" ,height:"100%"}}>

                                <FormControl  fullWidth variant="standard" sx={{mb:3}}>
                                    <InputLabel sx={{fontWeight : 600, fontSize:20}}> Product Title </InputLabel>
                                    <Input
                                        name="title"
                                        defaultValue={title}
                                        onChange={(e)=>setTitle(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl  variant="standard" sx={{mb:3}} >
                                    <InputLabel  sx={{fontWeight : 600, fontSize:20}}> Product Price </InputLabel>
                                    <Input
                                        name = "price"
                                        startAdornment={<InputAdornment position="start"> Rs </InputAdornment>}
                                        defaultValue={Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(price*30)}
                                        onChange={(e)=>setPrice(Math.floor(e.target.value)/30)}
                                    />
                                </FormControl>

                                <FormControl  variant="standard" sx={{mb:3, ml: 3}} >
                                    <InputLabel sx={{fontWeight : 600, fontSize:20}}> Rating </InputLabel>
                                    <Input
                                        name="rating"
                                        defaultValue={rating}
                                        onChange={(e)=>setRating(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl  fullWidth variant="standard" sx={{mb:3}} >
                                    <TextField
                                        name="descrip"
                                        label="Product Description"
                                        multiline
                                        defaultValue={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                </FormControl>
                                                                     
                                <IconButton
                                    onClick={()=>handleSubmit()}
                                    size="large"
                                >
                                    <SaveOutlinedIcon fontSize="large" color="info" />
                                </IconButton>
              
                            </CardContent>  
                        </Box>    
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            mt: 2, mb: 1, p: 1,
                            }}
                    >
                        <CardMedia component="img"
                            sx={{
                                width: 400,
                                objectFit: "contain",
                                backgroundColor: "#f7f7f7"}}
                                image={product.image}
                                alt="product.jpg"
                        />
                
                        <Box
                            sx={{
                                position : "relative",
                                height: 450,
                                width: 800,
                                ml: 4, mt: 4, mb: 1, p: 1,
                                border: "1px solid black"
                                }}
                        >
                            <CardContent sx={{ flex: '1 0 auto', textAlign: "left" }}>
                                
                                <Typography
                                    component="div"
                                    variant="h5"
                                    noWrap
                                    fontSize={40}
                                    fontWeight={700}
                                >
                                    {product.title}
                                </Typography>
                                        
                                <Typography 
                                    variant="h4"
                                    color="text.tertiary"
                                    fontWeight={600}
                                >
                                    Rs {Intl
                                        .NumberFormat("en-US", { maximumFractionDigits: 2 })                                        
                                        .format(product.price * 30
                                    )}   
                                </Typography>
                
                                        
                                <Typography                                           
                                    component="span"
                                    variant='h6'
                                    fontSize={25}                               
                                >                                              
                                    <Rating                                                  
                                        precision={0.1}
                                        value={product.rating}
                                        sx={{                                                       
                                            ml: 1,
                                            verticalAlign: "sub",
                                            color: "goldenrod",}}
                                            emptyIcon={
                                                <StarOutlineIcon sx={{ color: "black" }} />
                                            }
                                            readOnly                                       
                                    />                                 
                                </Typography>
                                        
                                                  
                                <Typography fontSize={25} sx={{ typography: { sm: 'body1', xs: 'body2' } }} >           
                                    {product.description}                                         
                                </Typography>
                                               
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 4,
                                    }}
                                >                            
                                    <Button                                                            
                                        variant="text"       
                                        sx={{                                                           
                                            color: "goldenrod",                                        
                                            border: "2px solid orange",                                        
                                        }}                                    
                                        startIcon={<AddCircleOutlineOutlinedIcon />}
                                        onClick={()=>{handleAddToCart(product.id)}}
                                    >
                                        Add To Cart..
                                    </Button>                    
                                                                     
                                    <IconButton
                                        onClick={() => setEditModeActive(true)}
                                        size="large"
                                    >
                                        <EditOutlinedIcon fontSize="large" color="info" />
                                    </IconButton>
                                </Box>
                            </CardContent>  
                        </Box>    
                    </Box>
            )}      
        </>
    )
}

export default Product;