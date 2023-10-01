
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { deleteProductInDB } from '../features/productsSlice';
import { toast } from "react-toastify";

const Products = () => {
  const defaultImg = 'https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg';
  const dispatch = useDispatch()
  const products= useSelector(state => state.products.list);

  console.log("state state", products);

  const handleDeleteClick = (id) => {
    toast.promise(
      dispatch(deleteProductInDB(id)),
      {
        pending: 'Product is being deleted..!!',
        success: 'Produuct Deleted..!!',
        error: 'Error in deleting product..!!!'
      }
  )
  }
    return (
      <>
                    
        <Grid
          container
          direction="row"
          spacing={1}                
        >
          {products.map((product, index) => {   
            return (
                    
              <Grid
                item
                zeroMinWidth
                xl
                key={index}  
              >

              
                <Box sx={{
                  position: "relative",
                  width: 350,
                  height : 350,
                  mt: 1, mb: 1, p:1,
                  border : "1px solid black"
                }}
                >
                  
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: "contain",
                      backgroundColor : "#f7f7f7"                    
                    }}
                    image={product.image || defaultImg}
                    alt="product.jpg"
                  />
                      
          <IconButton
            onClick={()=>handleDeleteClick(product.id)}
            size="large"
              sx={{
                position: "absolute",
                right: 2,
                top: 2,
                color : "red"
              }}
            >
              <DeleteOutlineRoundedIcon  fontSize="large"  />
            </IconButton>
            <Link
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                            to={`/product/${product.id}`}
                        >
        <CardContent sx={{ flex: '1 0 auto', textAlign:"left"}}>
          <Typography component="div" variant="h5" noWrap>
            {product.title}
            </Typography>
          <Typography component="span" variant='h6' >
              <Rating
                precision={0.1}
                value={product.rating}
                sx={{
                  ml: 1,
                  verticalAlign: "sub",
                  color: "yellowgreen",
                }}
                emptyIcon={
                  <StarOutlineIcon sx={{color : "black"}}/>
                }
                readOnly
              />
            </Typography>
          <Typography variant="h4" color="text.secondary" fontWeight={500} >
            Rs {Intl.NumberFormat("en-US", {maximumFractionDigits : 2}).format(product.price*30)}
            </Typography>


            </CardContent>
            </Link>
                </Box>             
                    </Grid>
                )
            })} 
        </Grid>

      </>
    )
}

export default Products;