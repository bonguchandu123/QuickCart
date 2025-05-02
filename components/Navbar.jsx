// "use client"
// import React from "react";
// import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
// import Link from "next/link"
// import { useAppContext } from "@/context/AppContext";
// import Image from "next/image";
// import { useClerk, UserButton } from "@clerk/nextjs";

// const Navbar = () => {

//   const { isSeller, router,user } = useAppContext();
//   const {openSignIn} = useClerk()
 


//   return (
//     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
//       <Image
//         className="cursor-pointer w-28 md:w-32"
//         onClick={() => router.push('/')}
//         src={assets.logo}
//         alt="logo"
//       />
//       <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
//         <Link href="/" className="hover:text-gray-900 transition">
//           Home
//         </Link>
//         <Link href="/all-products" className="hover:text-gray-900 transition">
//           Shop
//         </Link>
//         <Link href="/about" className="hover:text-gray-900 transition">
//           About Us
//         </Link>
//         <Link href="/" className="hover:text-gray-900 transition">
//           Contact
//         </Link>

//         {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

//       </div>

//       <ul className="hidden md:!flex items-center gap-4 ">
//         <Image  className="w-4 h-4" src={assets.search_icon} alt="search icon" />
//         {user?<><UserButton>
//           <UserButton.MenuItems>
//             <UserButton.Action label="cart" labelIcon={<CartIcon/>} onClick={() => router.push('/cart')}/>
//             <UserButton.Action label="My-Orders" labelIcon={<BagIcon/>} onClick={() => router.push('/my-orders')}/>

        

//           </UserButton.MenuItems>
//           </UserButton></>  :
//         <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
//           <Image src={assets.user_icon} alt="user icon" />
//           Account
//         </button>}
//       </ul>

//       <div className="flex items-center md:hidden gap-3">
//         {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
//         {user?<><UserButton>
//           <UserButton.MenuItems>
//             <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={() => router.push('/')}/>
//             <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={() => router.push('/all-products')}/>
//             <UserButton.Action label="cart" labelIcon={<CartIcon/>} onClick={() => router.push('/cart')}/>
//             <UserButton.Action label="My-Orders" labelIcon={<BagIcon/>} onClick={() => router.push('/my-orders')}/>

        

//           </UserButton.MenuItems>
//           </UserButton></>  :
//         <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
//           <Image src={assets.user_icon} alt="user icon" />
//           Account
//         </button>}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


'use client'
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, user } = useAppContext();
  const { openSignIn } = useClerk();
  const { router } = useAppContext();
  
  // State to toggle search bar visibility
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle the search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the /search page with the query
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);

    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 relative">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Centered Search Bar */}
      {searchVisible && (
    <div className="absolute inset-0 top-10 flex justify-center items-center z-50">
    <form
      onSubmit={handleSearchSubmit}
      className="relative bg-white p-2 border flex border-gray-300 rounded-md w-full max-w-sm"
    >
      {/* Close icon */}
      <button
        type="button"
        onClick={() => setSearchVisible(false)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
      >
        ✖
      </button>
  
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded-md w-full"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Search
      </button>
    </form>
  </div>
  
      )}

      <ul className="hidden md:!flex items-center gap-4">
        {/* Search Icon with Toggle */}
        <div className="relative">
          <Image
            className="w-4 h-4 cursor-pointer"
            src={assets.search_icon}
            alt="search icon"
            onClick={() => setSearchVisible(!searchVisible)}
          />
        </div>
    
          <a className="hover:text-gray-900 transition">
            <Image onClick={router.push('/chat')} className="w-6 h-6" src={assets.chat_icon} alt="chat icon" />
          </a>
     
        

      

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push('/cart')}
              />
              <UserButton.Action
                label="My-Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push('/my-orders')}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon />}
                onClick={() => router.push('/')}
              />
              <UserButton.Action
                label="Products"
                labelIcon={<BoxIcon />}
                onClick={() => router.push('/all-products')}
              />
              <UserButton.Action
                label="cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push('/cart')}
              />
              <UserButton.Action
                label="My-Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push('/my-orders')}
              />
              <UserButton.Action
                label="Search"
                labelIcon={<BagIcon/>}
                onClick={() => setSearchVisible(!searchVisible)}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
