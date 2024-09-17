'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { API_URL } from '../../../../env';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Alert } from '@mui/material';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = async (id: string): Promise<Product> => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      return await res.json();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (typeof id === 'string') {
      const loadProduct = async () => {
        try {
          setLoading(true);
          const data = await fetchProduct(id);
          setProduct(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    } else {
      setError('Invalid product ID');
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h6" color="textSecondary">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h6" color="textSecondary">Product not found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{paddingTop:'30px'}}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.title}
              sx={{ height: 300, objectFit: 'contain' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">{product.title}</Typography>
              <Typography variant="body1" color="textSecondary" paragraph>{product.description}</Typography>
              <Typography variant="h6">Price: ${product.price}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
