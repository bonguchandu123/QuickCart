'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the ProductCard, Footer, and Navbar components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductCard = dynamic(() => import('@/components/ProductCard'), { ssr: false });

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  console.log(query);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
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
