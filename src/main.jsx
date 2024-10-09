import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import 'react-toastify/dist/ReactToastify.css';



createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={Routes}></RouterProvider>
    </AuthProvider>
)
