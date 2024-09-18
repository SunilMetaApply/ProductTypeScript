"use client"
import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import styles from './HeaderSearch.module.css';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../../env';

interface Product {
  id: number;
  title: string;
}

const HeaderSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products?limit=194`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, products]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (productId: number, event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setSearchTerm('');
    setSuggestions([]);
    router.push(`/products/${productId}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder='Search Products...'
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.customTextField}
      />

      {suggestions.length > 0 && (
        <div className={styles.suggestionsContainer}>
          <p>Searched products</p>
          <ul className={styles.suggestionsList}>
            {suggestions.map((product) => (
              <li key={product.id}>
                <span  onClick={(e) => handleSuggestionClick(product.id, e)}  >
                  {product.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
