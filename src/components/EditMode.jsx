import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from "@mui/material/TextField";
import Rating from '@mui/material/Rating';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from "@mui/material";


const EditProduct = (props) => {
    const { product,exitEditMode } = props;
    const [image, setImage] = useState(product.image);
    const [price, setPrice] = useState(product.price);
    const [title, setTitle] = useState(product.title);
    const [rating, setRating] = useState(product.rating.rate);
    const [description, setDescription] = useState(product.description);

    return (
        <>
             <Box sx={{
                display: "flex",
                width: "100%",
                mt: 2, mb: 1, p: 1,
            }}
            >
                <CardMedia component="img"
                    sx={{
                        width: 400,
                        objectFit: "contain",
                        backgroundColor: "#f7f7f7"
                    }}
                    image={product.image}
                    alt="product.jpg"
                />

                <Box
                    sx={{
                        height:450,
                        width: 800,
                        ml:4,mt: 4, mb: 1, p: 1,
                        border: "1px solid black"
                    }}
                >
                    <CardContent sx={{ flex: '1 0 auto', textAlign: "left" }}>
                        <Box
                            component="form"
                            sx={{
                              '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                        
                            <TextField label="Product Title" variant="outlined"/>
                        </Box>
                        
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
                                    color: "goldenrod",
                                }}
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
                        
                        
                        <Typography variant="body1" fontSize={25}>
                            {product.description}
                        </Typography>

                        <Button
                            variant="outlined"
                            sx={{
                                color: "orange",
                                border: "2px solid orange",
                            }}
                            startIcon={<AddCircleOutlineOutlinedIcon/>}
                        >
                             Add To Cart...
                        </Button>
                        
                        <IconButton size="large">
                            <DeleteIcon fontSize="large" color="error" />
                        </IconButton>
                        
                        <IconButton size="large" onClick={exitEditMode}>
                            <SaveOutlinedIcon fontSize="large" color="info" />
                        </IconButton>
                        
                            
                    </CardContent>
                </Box>


            </Box>
        </>
    )
}

export default EditProduct;