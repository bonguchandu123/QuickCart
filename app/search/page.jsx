'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  console.log(query)

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ensure we are only accessing location on the client-side
    if (typeof window !== "undefined" && typeof window.location !== "undefined") {
      console.log(window.location); // Example of using location in the browser
    }

    if (query) {
      const fetchFilteredProducts = async () => {
        try {
          const res = await fetch(`/api/search?query=${query}`);
          const data = await res.json();

          if (data.success) {
            setFilteredProducts(data.products); // match backend key
          } else {
            setError(data.message);
          }
        } catch (err) {
          setError('An error occurred while fetching the products.');
        }
      };

      fetchFilteredProducts();
    }
  }, [query]); // watch query only

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">Search Results</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>
        <div>
          {error && <p>{error}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
