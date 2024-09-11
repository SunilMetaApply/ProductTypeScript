"use client";
import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid, Card, CardContent, Typography, CardMedia, Box, Container } from '@mui/material';
import useProducts from '../customhooks/useProducts';

const Categories = () => {

    const { categories, filteredProducts, handleCategoryChange } = useProducts();


  return (
    <>
        <Typography variant="h6">Categories</Typography>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category.slug}
              control={<Checkbox name={category.slug} onChange={handleCategoryChange} />}
              label={category.name}
            />
          ))}
        </FormGroup>
    </>
  )
}

export default Categories