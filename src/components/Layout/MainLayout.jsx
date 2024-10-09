import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../pages/Header/Header';
import Footer from '../../pages/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='container mx-auto'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;