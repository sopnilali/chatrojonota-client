import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import Swal from 'sweetalert2';

const UserDashboard = () => {

    const [isMenuVisible, setMenuVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  }

  const { user, logoutUser} = useAuth();

  const navigate = useNavigate();

  const handleLogout = ()=> {
    logoutUser()
    .then((user) => {
      Swal.fire({
        title: "Logout Successful!",
        icon: "success"
      });
      navigate('/user/login')
     
    })
    .catch(error => console.error(error))
  }
    



    return (
        <div>
           <div class="  container mx-auto flex h-screen bg-gray-100">

{isMenuVisible ? <div class="  md:flex flex-col w-64 bg-white">
    <div class=" flex flex-col items-center justify-center py-4 border ">
    <a href="#" class="mx-auto">
        Welcome to Dashboard
    </a>

    <div class="flex flex-col items-center mt-6 -mx-2 ">
        <img class="object-cover w-24 h-24 mx-2 rounded-full" src={user?.photoURL } alt="avatar"/>
        <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user?.displayName}</h4>
        <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user?.email}</p>
    </div>
    </div>
    <div class="flex flex-col flex-1 ">
        <nav class="flex-1 px-2 py-4 bg-gray-800">
            <Link to={'/user/dashboard'} class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Dashboard
            </Link>
  
                <div className=' '>
                    <h2 onClick={toggleDropdown} className='flex w-full cursor-pointer items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 '>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                        
                        POST</h2>
                    {isOpen ? <div className='flex flex-col '>
                        <NavLink to='/user/add-posts' className='px-4 py-2 text-gray-100 hover:bg-gray-700'>Create Post</NavLink>
                        <NavLink to='/user/my-posts' className='px-4 py-2 text-gray-100 hover:bg-gray-700'>My Posts</NavLink>
                    </div> : ""}
                </div>

                <div className=' '>
                    <h2 onClick={toggleDropdown2} className='flex w-full cursor-pointer items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 '>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                        
                        Category</h2>
                    {isOpen2 ? <div className='flex flex-col '>
                        <NavLink to='/user/add-category' className='px-4 py-2 text-gray-100 hover:bg-gray-700'>Add Category</NavLink>
                        <NavLink to='/user/my-category' className='px-4 py-2 text-gray-100 hover:bg-gray-700'>My Categories</NavLink>
                    </div> : ""}
                </div>

            
            <button onClick={handleLogout} class="flex items-center w-full px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Logout
            </button>
        </nav>
    </div>
</div> : " "}
<div class="flex flex-col flex-1 overflow-y-auto">
    <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
        <div class="flex items-center px-4">
            <button onClick={toggleMenu} class="text-gray-500 focus:outline-none focus:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        
        </div>

    </div>
    <div class="p-4 flex flex-col">
        <Outlet/>
    </div>
</div>

</div>
        </div>
    );
};

export default UserDashboard;