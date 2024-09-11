"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  slug: string;
  name: string;
  url: string;
}

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

const useProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('none');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get<Category[]>('https://dummyjson.com/products/categories');
        const productsResponse = await axios.get<{ products: Product[] }>('https://dummyjson.com/products?limit=194');
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data.products);
        setFilteredProducts(productsResponse.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (search) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Sort by price
    if (sortOrder === 'low-to-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategories, sortOrder, products]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.name;
    let updatedSelectedCategories = [...selectedCategories];

    if (event.target.checked) {
      updatedSelectedCategories.push(category);
    } else {
      updatedSelectedCategories = updatedSelectedCategories.filter((cat) => cat !== category);
    }

    setSelectedCategories(updatedSelectedCategories);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  const handleSortChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };

  return {
    categories,
    filteredProducts,
    handleCategoryChange,
    handleSearchChange,
    handleSortChange,
  };
};

export default useProducts;
