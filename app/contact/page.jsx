'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar'; // Adjust the import path if necessary
import Footer from '@/components/Footer'; // Adjust the import path if necessary
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // Example: Call an API to handle form submission (you can replace this with your backend logic)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Message sent successfully!');
        toast.success(res.formData.message)
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Something went wrong, please try again.');
      }
    } catch (error) {
      setStatus('An error occurred, please try again.');
      toast.error(error.message)
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-lg text-gray-600 mt-4">Have a question or want to work with us? Reach out below!</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>

          {status && (
            <div className="mt-4 text-center text-gray-700">
              <p>{status}</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
