import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email,setEmail] = useState('');

  const onChange = async(e) => {

    e.preventDefault()
    try {
      const {data} = await axios.post('/api/email/add',{email})
      if(data.success){
        toast.success(data.message)
        setEmail('')
      }else{
        toast.error(data.message)
      }
  
      
    } catch (error) {
      toast.error(error.message)
      
    }

   


  }

 
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-medium">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-gray-500/80 pb-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form  onSubmit={onChange} className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input onChange={(e) => setEmail(e.target.value)} value={email}
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
        />
        <button type="submit" className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
