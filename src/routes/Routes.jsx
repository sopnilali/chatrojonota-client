import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainLayout from '../components/Layout/MainLayout';
import Home from '../pages/Home/Home';
import AllPosts from '../components/Posts/AllPosts';
import AddPost from '../components/Posts/AddPost';
import AllCategory from '../components/Category/AllCategory';
import Login from '../pages/Login/Login';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import SignUp from '../pages/SignUp/SignUp';
import PrivateRoutes from './PrivateRoutes';
import UserDashboard from '../components/Layout/UserDashboard';
import DashboardPage from '../shared/DashboardPage';
import AddCategory from '../components/Category/AddCategory';
import MyCategory from '../components/Dashboard/MyCategory';
import MyPost from '../components/Dashboard/MyPost';
import PostDetails from '../components/Posts/PostDetails';

const Routes = createBrowserRouter ([
    {
      element:<MainLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {
          path: '/',
          element: <Home/>
        },
        // Post Section is here
        {
          path: '/all-posts',
          element: <AllPosts/>
        },
        // Category Section is here
        {
          path: '/all-categories',
          element: <AllCategory/>
        },
        {
          path: '/post/post-details/:id',
          element: <PrivateRoutes><PostDetails/></PrivateRoutes>
        }
      ]
    },
    {
      element: <PrivateRoutes><UserDashboard/></PrivateRoutes>,
      children: [
        {
          path:'/user/dashboard',
          element: <PrivateRoutes><DashboardPage/></PrivateRoutes>
        },
        {
          path:'/user/add-posts',
          element:<PrivateRoutes><AddPost/></PrivateRoutes>
        },
        {
          path:'/user/my-posts',
          element:<MyPost/>
        },
        {
          path:"/user/add-category",
          element: <AddCategory/>
        },
        {
          path:'/user/my-category',
          element:<MyCategory/>
        }
      ]
    }
    ,
    // outSite section
    {
      path: '/user/login',
      element: <Login/>
    },
    {
      path: '/user/signup',
      element: <SignUp/>
    },
  ])

export default Routes;