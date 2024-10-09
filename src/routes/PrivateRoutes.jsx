import React, { Children } from 'react';
import { useAuth } from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const PrivateRoutes = ({children}) => {


    const {user, loading} = useAuth()

    const location = useLocation()
    
    if(loading){
        return <span className="loading loading-spinner "></span>
    }

    else if(user){
        return children
    }

    return (
        Swal.fire({
            title: "Please Login First",
            icon: "error"
          }),
        <ToastContainer></ToastContainer>,
        <Navigate to={'/user/login'} ></Navigate>
    );
};

export default PrivateRoutes;