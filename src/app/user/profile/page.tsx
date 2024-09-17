
"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import Link from 'next/link';

const Profile: React.FC = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);

  if (!userDetails) {
    return <Typography variant="h6">User details not available</Typography>;
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
        </Grid>
        <Grid item xs={6}>
            <Link href={`/user/edit`}>Edit</Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={1}>
          <Avatar src={userDetails.image} alt={`${userDetails.firstName} ${userDetails.lastName}`} sx={{ width: 128, height: 128 }} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Personal Information</Typography>
          <Typography variant="body1">Name: {userDetails.firstName} {userDetails.lastName}</Typography>
          <Typography variant="body1">Username: {userDetails.username}</Typography>
          <Typography variant="body1">Email: {userDetails.email}</Typography>
          <Typography variant="body1">Phone: {userDetails.phone}</Typography>
          <Typography variant="body1">Gender: {userDetails.gender}</Typography>
          <Typography variant="body1">Age: {userDetails.age}</Typography>
          <Typography variant="body1">Birth Date: {userDetails.birthDate}</Typography>
          <Typography variant="body1">Height: {userDetails.height} cm</Typography>
          <Typography variant="body1">Weight: {userDetails.weight} kg</Typography>
          <Typography variant="body1">Eye Color: {userDetails.eyeColor}</Typography>
          <Typography variant="body1">Hair: {userDetails.hair.color}, {userDetails.hair.type}</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Address</Typography>
          <Typography variant="body1">Address: {userDetails.address.address}</Typography>
          <Typography variant="body1">City: {userDetails.address.city}</Typography>
          <Typography variant="body1">State: {userDetails.address.state}</Typography>
          <Typography variant="body1">Postal Code: {userDetails.address.postalCode}</Typography>
          <Typography variant="body1">Country: {userDetails.address.country}</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Company</Typography>
          <Typography variant="body1">Name: {userDetails.company.name}</Typography>
          <Typography variant="body1">Department: {userDetails.company.department}</Typography>
          <Typography variant="body1">Title: {userDetails.company.title}</Typography>
          <Typography variant="body1">Address: {userDetails.company.address.address}, {userDetails.company.address.city}</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Bank</Typography>
          <Typography variant="body1">Card Number: {userDetails.bank.cardNumber}</Typography>
          <Typography variant="body1">Card Type: {userDetails.bank.cardType}</Typography>
          <Typography variant="body1">Card Expiry: {userDetails.bank.cardExpire}</Typography>
          <Typography variant="body1">Currency: {userDetails.bank.currency}</Typography>
          <Typography variant="body1">IBAN: {userDetails.bank.iban}</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Crypto</Typography>
          <Typography variant="body1">Coin: {userDetails.crypto.coin}</Typography>
          <Typography variant="body1">Wallet: {userDetails.crypto.wallet}</Typography>
          <Typography variant="body1">Network: {userDetails.crypto.network}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
