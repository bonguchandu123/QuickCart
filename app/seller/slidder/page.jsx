"use client"

import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";

import Image from "next/image";

import { useState } from "react";
import toast from "react-hot-toast";




const AddSlidder = () => {
    const {getToken} = useAppContext()
      const [file, setFile] = useState('');
      const [title, setTitle] = useState('');
      const [offer, setOffer] = useState('');
      const [buttonText1, setButtonText1] = useState('');
      const [buttonText2, setButtonText2] = useState('');
      
    const handleSubmit = async(e)=> {
        e.preventDefault();

        const formData = new FormData()
        formData.append('title',title)
        formData.append('offer',offer)
        formData.append('buttonText1',buttonText1)
        formData.append('buttonText2',buttonText2)
        formData.append('imgSrc',file)

        try {
            const token = await getToken()
            const {data} = await axios.post('/api/slidder/add',formData,{headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                toast.success(data.message)
                setTitle('')
                setOffer('')
                setButtonText1('')
                setButtonText2('')
                setFile('')
              
                
               
            
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }


 }


return (

    <div className="min-h-100vh flex-1 flex justify-between flex-col">
       
        <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg ">
        <p className="text-base font-medium">Slidder Image</p>

<div>
  <label htmlFor="imgSrc">
    <input
      id="imgSrc"
      type="file"
      name="imgSrc" 
      onChange={(e) => setFile(e.target.files[0])}
      hidden
    />
    <Image
      className="max-w-24 cursor-pointer"
      src={file ? URL.createObjectURL(file) : assets.upload_area}
      alt="Slider Image"
      width={100}
      height={100}
    />
  </label>
</div>

            <div>  
                <p className="text-base font-medium">Tittle</p>            
          
            <label htmlFor="title">
                <input type="text" id="title" className="outline-none w-full border border-black  md:py-2.5 py-2 px-3 " onChange={(e)=> setTitle(e.target.value)} value={title} placeholder="enter title"/>
            </label>
            </div>  
            <div>
                <p className="text-base font-medium">Offer</p>              
          
            <label htmlFor="offer">
                <input type="text" id="offer" className="outline-none w-full border border-black  md:py-2.5 py-2 px-3" onChange={(e)=> setOffer(e.target.value)} value={offer} placeholder="enter offer"/>
            </label>
            </div>  
            <div>              
          <p className="text-base font-medium">Button text1</p>
            <label htmlFor="buttonText1">

                <input type="text" id="buttonText1" className="outline-none w-full border border-black  md:py-2.5 py-2 px-3 " onChange={(e)=> setButtonText1(e.target.value)} value={buttonText1} placeholder="enter button text1"/>
            </label>
            </div>  
            <div>              
          <p className="text-base font-medium">Button text2</p>
            <label htmlFor="buttonText2">

                <input type="text" id="buttonText2" className="outline-none w-full border border-black  md:py-2.5 py-2 px-3 " onChange={(e)=> setButtonText2(e.target.value)} value={buttonText2} placeholder="enter button text1"/>
            </label>
            </div> 


            <button type="submit" className="border border-black bg-black text-white p-2 w-full rounded-sm">Add</button> 


        </form>








    </div>


)
}

export default AddSlidder;