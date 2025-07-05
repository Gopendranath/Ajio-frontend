import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Fuse from 'fuse.js';
import { ProductCard } from './ProductCard';
import type { RootState } from '../store';
import type { Product } from '../store/productsSlice';

const SearchedPage: React.FC = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';
  const products = useSelector((state: RootState) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const fuseOptions = {
        keys: ['title', 'description', 'category'],
        threshold: 0.4,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        isCaseSensitive: false,
        distance: 100,
        shouldSort: true,
        sortFn: (a: { score: number }, b: { score: number }) => a.score - b.score,
      };
      const fuse = new Fuse(products, fuseOptions);
      if (searchQuery) {
        const results = fuse.search(searchQuery).map(result => result.item);
        setFilteredProducts(results);
      } else {
        setFilteredProducts(products);
      }
    }
  }, [searchQuery, products]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">No products found for "{searchQuery}"</p>
      )}
      <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default SearchedPage;
