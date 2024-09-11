// components/HeaderMenu.tsx
"use client";
import React, { useState, MouseEvent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Container } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { LoginOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice';

const titleStyle = {
  flexGrow: 1,
};

const HeaderMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: 'primary.main' }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: '0px 0px' }}>
          <Link href={`/`} style={titleStyle}>
            <Typography variant="h6">MetaApply</Typography>
          </Link>
          <Link href={`/products`} style={{ color: 'inherit', textDecoration: 'none' }}>Products</Link>
          {isAuthenticated ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="account"
                onClick={handleMenuOpen}
                sx={{ ml: 2 }}
              >
                <Typography sx={{ ml: 1 }}>
                  {username}
                </Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link href={`/login`} style={{ color: 'inherit', textDecoration: 'none', display:'flex', alignItems:'center', gap:'3px' }}>
              <LoginOutlined sx={{ ml: 2 }} /> Login
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderMenu;
