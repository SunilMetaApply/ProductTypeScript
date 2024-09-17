"use client"
import React from 'react'
import { RootState } from '../../../redux/store';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Edit:React.FC = () => {
    const { userDetails } = useSelector((state: RootState) => state.auth);
    if (!userDetails) {
      return <Typography variant="h6">User details not available</Typography>;
    }

    const handleChange = () =>{

    }

  return (
    <>
      <Container>
        <Box sx={{padding:'30px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <TextField
                    label="First Name"
                    fullWidth
                    value={userDetails.firstName}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                    label="Middle Name"
                    fullWidth
                    value={userDetails.maidenName}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                    label="Last Name"
                    fullWidth
                    value={userDetails.lastName}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                    label="Phone"
                    fullWidth
                    value={userDetails.phone}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                    label="Email"
                    fullWidth
                    value={userDetails.email}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                    label="Address"
                    fullWidth
                    value={userDetails.address.address}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained">Update</Button>
                </Grid>
            </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Edit