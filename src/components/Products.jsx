import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Typography from '@mui/material/Typography';

const ProductListItem = (prop) => {
  const { product } = prop;
  // console.log("Product in list", product);
    return (
      <>
        <Box sx={{
          width: 350,
          mt: 1, mb: 1, p:1,
          border : "1px solid black"
        }}>
            <CardMedia
            component="img"
            sx={{
              height: 200,
              objectFit: "contain",
              backgroundColor : "#f7f7f7"
            }}
            image={product.image}
            alt="product.jpg"
            />
        <CardContent sx={{ flex: '1 0 auto', textAlign:"left"}}>
          <Typography component="div" variant="h5" noWrap>
            {product.title}
            </Typography>
          <Typography component="span" variant='h6' >
              <Rating
                precision={0.1}
                value={product.rating.rate}
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
              <Typography sx={{ml:2}} component="span" variant='h6'>
                {product.rating.count}
              </Typography>
            </Typography>
          <Typography variant="h4" color="text.secondary" fontWeight={500} >
            Rs {Intl.NumberFormat("en-US", {maximumFractionDigits : 2}).format(Math.floor(product.price*50.58*100)/100)}
          </Typography>
          </CardContent>
        </Box>
      </>
    )
}

export default ProductListItem;