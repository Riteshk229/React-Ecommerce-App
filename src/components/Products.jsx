import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const Product = (prop) => {
  const { product } = prop;
  console.log("Product in list", product);
    return (
      <Card sx={{
        display: 'flex',
        justifyContent: "flex-start",
        width: "100%",
        border:"1px solid #f7f7f7"
      }}>
        <Box sx={{ display: 'flex', mt: 1,mb: 1 }}>
            <CardMedia
            component="img"
            height={200}
            sx={{
              width: 200,
              objectFit: "contain",
              backgroundColor : "#f7f7f7"
            }}
            image={product.image}
            alt="Live from space album cover"
            />
        <CardContent sx={{ flex: '1 0 auto', textAlign:"left"}}>
          <Typography component="div" variant="h5">
            {product.title}
            </Typography>
            <Typography component="p" variant='h6'>
              {product.rating.rate} <Rating readOnly value={product.rating.rate} />
              <Typography sx={{ml:2}} component="span" variant='body1' fontWeight={500}>
                {product.rating.count}
              </Typography>
            </Typography>
          <Typography variant="h4" color="text.secondary" fontWeight={500} >
            Rs {Intl.NumberFormat("en-US", {maximumFractionDigits : 2}).format(Math.floor(product.price*50.58*100)/100)}
          </Typography>
          </CardContent>
          </Box>
        </Card>
    )
}

export default Product;