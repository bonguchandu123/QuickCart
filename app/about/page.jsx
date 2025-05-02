'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">About Us</h2>
            <p className="text-lg text-gray-600 mt-4">
              We are a passionate team dedicated to delivering exceptional service and products to our customers.
              Learn more about what we do and our mission below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg">
                Our mission is to provide the best products and services that help our customers lead a better,
                more efficient life. We aim to set new standards of excellence in everything we do.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-700 text-lg">
                Integrity, customer satisfaction, and innovation are at the core of everything we do.
                We strive to be the trusted partner our customers turn to for their needs, and we pride
                ourselves on delivering solutions that make a difference.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get In Touch</h3>
            <p className="text-lg text-gray-600">
              If you'd like to learn more about us, feel free to{' '}
              <a href="mailto:contact@ourcompany.com" className="text-orange-700 hover:underline">
                contact us
              </a>{' '}
              for more information.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
