import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { connect } from 'react-redux';

const Navbar = (props) => {

  const { userID, cartSize } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          to={`/user/cart`}
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          My Cart
        </Link>
      </MenuItem>

      <MenuItem>
        <Link
          to={`/add`}
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          Add Product
        </Link>
      </MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <Link
        to={'/user/cart'}
        style={{
          textDecoration: "none",
          color: "inherit"
        }}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show x new items in cart" color="inherit">
            <Badge badgeContent={cartSize} color="secondary">    
              <ShoppingCartIcon />
            </Badge>
          </IconButton>       
          <p>My Cart</p>
        </MenuItem>
      </Link>

      <Link
        to={`/add`}
        style={{
          textDecoration: "none",
          color: "inherit"
        }}
      >
        <MenuItem>
          <IconButton size="large" aria-label="account of current user" color="inherit">
            <AddShoppingCartIcon />
          </IconButton>
          <p>Add Product</p>
        </MenuItem>
      </Link>

    </Menu>
  );

    return (
      <>   
        <Box sx={{ flexGrow: 1 }} aria-label='Nav Container'>     
          <AppBar position="static" aria-label='Nav'>
            <Toolbar >             
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit"}}
                to={"/"}
              >
              <Typography                            
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{display: {xs:'none', sm:"block"},mr:2}}             
                >
                    E-commerce                        
                </Typography>
              </Link>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{display:{xs:"none",md:"flex"}}}>
                            
                  <Link
                    to={`/user/cart`}
                    style={{
                      textDecoration: "none",
                      color: "inherit"
                    }}
                  >
                      <IconButton                      
                        aria-label="show X items in cart"                        
                        color="inherit"                           
                        sx={{ mr: 3 }}     
                      >
                    <Badge badgeContent={cartSize} color="secondary">                 
                      <ShoppingCartIcon fontSize='large' />             
                    </Badge>
                              
                    <Typography
                      variant='6'
                      noWrap
                      component='span'
                      sx={{ml: 2 }}
                    > 
                      Cart
                    </Typography>
                  </IconButton> 
                </Link>

                <IconButton
                  edge="end"
                  aria-label="account of current user"              
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{mr:2}}
                  >
                                
                  <AccountCircle fontSize='large' />
                  
                  <Typography            
                    variant='6'
                    noWrap
                    component='span'
                    sx={{ ml: 2 , textTransform : "capitalize"}}
                  >           
                    User
                  </Typography>
                </IconButton>
              </Box>

              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>  
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >         
                  <MoreIcon />    
                </IconButton>
              </Box>
            </Toolbar>   
          </AppBar>
              
          {renderMenu}
          {renderMobileMenu}      
        </Box>
      </>
    )
}

const mapStateToProp = (state,ownProp) => {
  const { userID } = ownProp;
  const cartSize = state.cart.cartItems.products !== undefined && Object.keys(state.cart.cartItems.products).length;
  return {
    userID,
    cartSize 
  }
}


export default connect(mapStateToProp)(Navbar);