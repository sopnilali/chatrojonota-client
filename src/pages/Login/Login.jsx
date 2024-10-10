import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import SocialLogin from './SocialLogin';
import Swal from 'sweetalert2';

const Login = () => {

    const {user, userSignIn} = useAuth()
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    const handleSigin = (data) => {
        // call your server side code here
        const email = data.email;
        const password = data.password;
        const loginData = { email, password}
        console.log(loginData);

        userSignIn(email, password)
        .then(result => {
             console.log(result);
             Swal.fire({
                title: "Login Successfull!",
                icon: "success"
              });
             // Redirect to dashboard page
             navigate('/user/dashboard');
 
        })
        .catch(err => {
             console.log(err);
             Swal.fire({
                title: "Please Correct email and Password!",
                icon: "warning"
              });
        })
    }



    return (
        <div className='container mx-auto'>
           <div className="w-full max-w-md mx-auto p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
	<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
	<p className="text-sm text-center dark:text-gray-600">Dont have account?
		<a href="#" rel="noopener noreferrer" className="focus:underline hover:underline">Sign up here</a>
	</p>

	<div className="flex items-center w-full my-4">
		<hr  className="w-full dark:text-gray-600" />
		<p className="px-3 dark:text-gray-600">OR</p>
		<hr  className="w-full dark:text-gray-600" />
	</div>
    <SocialLogin/>
	<form onSubmit={handleSubmit(handleSigin)} noValidate="" action="" className="space-y-8">
		<div className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">Email address</label>
				<input type="email" {...register("email", { required: true })} id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 input input-bordered rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
			</div>
			<div className="space-y-2">
                <label htmlFor="password" className="text-sm">Password</label>
			    <input type="password" {...register("password", { required: true })} id="password" placeholder="*****" className="w-full px-3 py-2 input input-bordered border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
			</div>
		</div>
		<button type="submit" className="w-full btn btn-warning px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Sign in</button>
	</form>
    <div className="flex items-center justify-center my-8">
        <p>Don't have an account? <Link to="/user/signup" className="text-sm text-blue-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-gray-600">Sign up</Link></p> 
    </div>
    <Link to={'/'}>Go to Home</Link>
</div>
        </div>
    );
};

export default Login;