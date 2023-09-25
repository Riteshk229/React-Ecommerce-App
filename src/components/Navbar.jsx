import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.55),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1ch + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '65%',
      [theme.breakpoints.up('md')]: {
        width: '50ch',
        },
        [theme.breakpoints.between("xs", "md")]: {
          width: '30ch'
      }
    },
  }));

const Navbar = () => {
    
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
        <IconButton size="large" aria-label="show x new items in cart" color="inherit">
        <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon/>
        </Badge>
        </IconButton>
              <p>Cart Items</p>
          </MenuItem>
          <MenuItem>
              <IconButton size="large" aria-label="account of current user" color="inherit">
                  <AccountCircle/>
              </IconButton>
              <p>Account</p>
          </MenuItem>
    </Menu>
  );

    return (
        <>
            <Box sx={{ flexGrow: 1}} aria-label='Nav Container'>
                <AppBar position="static" aria-label='Nav'>
                    <Toolbar >
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{display: {xs:'none', sm:"block"},mr:2}}
                        >
                            E-commerce
                        </Typography>

                        <Search aria-label='search container'>
                            <SearchIconWrapper aria-label='search wrapper'>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{display:{xs:"none",md:"flex"}}}>
                            <IconButton
                                aria-label="show X items in cart"
                                color="inherit"
                                sx={{mr:3}}
                            >
                                <Badge badgeContent={4} color="secondary">
                                    <ShoppingCartIcon fontSize='large'/>
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
                                    sx={{ ml: 2 }}
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

export default Navbar;