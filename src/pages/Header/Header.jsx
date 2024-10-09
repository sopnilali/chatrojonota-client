import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './header.css'
import { useAuth } from '../../hook/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
const Header = () => {

  const { user, logoutUser} = useAuth();

  const navigate = useNavigate();

  const navlinks = <>
                  <li className='mr-2 mb-2 md:mb-1'><NavLink to={'/'}>Home</NavLink></li>
                  <li className='mr-2 mb-2 md:mb-1'><NavLink to={'/all-posts'}>All Post</NavLink></li>
                  {user ? <li className='mr-2 mb-2 md:mb-1'><NavLink to={'/user/add-posts'}>Add Post</NavLink></li> : ""}
                  <li className='mr-2 mb-2 md:mb-1'><NavLink to={'/all-categories'}>All Category</NavLink></li>
  
  </>

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
           <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {navlinks}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
       {navlinks}
    </ul>
  </div>
  <div className="navbar-end">
    {user ? <div className=' flex justify-center items-center mr-2'>
      <h2 className='px-2'>{user?.displayName}</h2>
      <div className="avatar">
    <div className="w-12">
      <img className=' w-full object-cover rounded-full' src={user?.photoURL} />
    </div>
  </div>
    </div> : ""}
    {user ? <button onClick={handleLogout} className='btn btn-outline btn-md'>Logout</button> : <Link className='btn btn-primary' to={'/user/login'}>Login</Link>}
  </div>
  <ToastContainer></ToastContainer>
</div>
    );
};

export default Header;