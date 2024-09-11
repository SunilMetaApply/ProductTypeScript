"use client"
import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import useProducts from '../customhooks/useProducts';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Home: React.FC = () => {
  const { categories, filteredProducts, handleCategoryChange, handleSearchChange, handleSortChange } = useProducts();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<string>('none');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    handleSearchChange(newSearch);
  };

  const handleSort = (event: SelectChangeEvent<string>) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    handleSortChange(newSortOrder);
  };

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '20px 0px', display: 'flex', justifyContent: 'end', gap: '1rem' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={search}
          size='small'
          onChange={handleSearch}
        />
        <FormControl>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            size='small'
            onChange={handleSort}
            label="Sort By"
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="low-to-high">Price: Low to High</MenuItem>
            <MenuItem value="high-to-low">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ padding: '20px 0px' }}>
        <Grid container spacing={2}>
          <Grid sx={{position:'sticky', top:'10px'}} item xs={3}>
            <Typography variant="h6">Categories</Typography>
            <FormGroup sx={{maxHeight:'500px', overflowY:'auto', flexWrap:'inherit'}}>
              {categories.map((category) => (
                <FormControlLabel
                  key={category.slug}
                  control={<Checkbox name={category.slug} onChange={handleCategoryChange} />}
                  label={category.name}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={9}>
            <Grid container spacing={2}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} md={4} key={product.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.primary">
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
