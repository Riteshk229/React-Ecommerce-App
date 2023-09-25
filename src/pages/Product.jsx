import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../assets/JS";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete'
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
    const [isLoading, setIsLoading] = useState(true);
    const { productID } = useParams();
    const [editModeActive, setEditModeActive] = useState("");
    const [product, setProduct] = useState({
        "id": productID,
        "title": "",
        "price": 0,
        "description": "",
        "category": "",
        "image": "",
        "rating": {
            "rate": 0,
            "count": 0
        }
    });

    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");



    useEffect(() => { 
        const fetchProduct = async () => {
            const response = await getProduct(productID);
            setProduct(response);
            setPrice(response.price)
            setDescription(response.description)
            setTitle(response.title);
            setRating(response.rating.rate);
            setImage(response.image);
            setEditModeActive(false);
            setIsLoading(false);
        }
        fetchProduct()

    }, []);
    console.log("Title", title);
    console.log("image", image);
    console.log("price", price);
    console.log("rating", rating);
    console.log("description", description);

    const handleImageChange = (e) => {
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = () => {
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
                            <CardContent sx={{ flex: '1 0 auto', textAlign: "left" }}>

                                <FormControl fullWidth variant="standard" sx={{mb:3}}>
                                    <InputLabel sx={{fontWeight : 600, fontSize:20}}> Product Title </InputLabel>
                                    <Input
                                        defaultValue={title}
                                        onChange={(e)=>setTitle(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl variant="standard" sx={{mb:3}} >
                                    <InputLabel sx={{fontWeight : 600, fontSize:20}}> Product Price </InputLabel>
                                    <Input
                                        startAdornment={<InputAdornment position="start"> Rs </InputAdornment>}
                                        defaultValue={Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Math.floor(price * 50.58 * 100) / 100)}
                                        onChange={(e)=>setPrice(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl variant="standard" sx={{mb:3, ml: 3}} >
                                    <InputLabel sx={{fontWeight : 600, fontSize:20}}> Rating </InputLabel>
                                    <Input
                                        defaultValue={rating}
                                        onChange={(e)=>setRating(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="standard" sx={{mb:3}} >
                                    <TextField
                                        label="Product Description"
                                        multiline
                                        defaultValue={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                </FormControl>
                                                                     
                                <IconButton
                                    onClick={()=>setEditModeActive(false)}
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
                                     Rs {Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Math.floor(product.price * 50.58 * 100) / 100)}
                                </Typography>
                
                                        
                                <Typography                                           
                                    component="span"
                                    variant='h6'
                                    fontSize={25}                               
                                >                                              
                                    <Rating                                                  
                                        precision={0.1}
                                        value={product.rating.rate}
                                        sx={{                                                       
                                            ml: 1,
                                            verticalAlign: "sub",
                                            color: "goldenrod",}}
                                            emptyIcon={
                                                <StarOutlineIcon sx={{ color: "black" }} />
                                            }
                                            readOnly                                       
                                    />
                                                               
                                    <Typography    
                                        sx={{ ml: 2 }}
                                        component="span"
                                        variant='h6'                                               
                                    > 
                                        {product.rating.count}
                                    </Typography>                                  
                                </Typography>
                                        
                                                  
                                <Typography fontSize={25} sx={{ typography: { sm: 'body1', xs: 'body2' } }} >           
                                    {product.description}                                         
                                </Typography>
                
                                           
                                <Button                                            
                                    variant="outlined"       
                                    sx={{                   
                                        color: "orange",
                                        border: "2px solid orange",}}
                                    startIcon={<AddCircleOutlineOutlinedIcon />}                                          
                                >
                                    Add To Cart...
                                </Button>
                                        
                                <IconButton size="large">
                                    <DeleteIcon fontSize="large" color="error" />
                                </IconButton>
                                                                     
                                <IconButton
                                    onClick={()=>setEditModeActive(true)}
                                    size="large"
                                >
                                    <EditOutlinedIcon fontSize="large" color="info" />
                                </IconButton>
              
                            </CardContent>  
                        </Box>    
                    </Box>
            )}      
        </>
    )
}

export default Product;