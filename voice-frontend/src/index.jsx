import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,Navigate} from 'react-router-dom'
import UserLogin from './components/user_credentials/UserLogin';
import AdminLogin from './components/user_credentials/AdminLogin';
import UserRegister from './components/user_credentials/UserRegister';
import AdminRegister from './components/user_credentials/AdminRegister';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Navigate to="/home" replace/>
  },
  {
    path:'/admin',
    element:<Navigate to="/admin/home" replace/>
  },
  {
    path:'/home',
    element:<App/>,
  },
  {
    path: '/admin/home',
    element: <App />
  },
  {
    path: '/login',
    element: <UserLogin />,
  },
  {
    path:'/admin/login',
    element:<AdminLogin/>
  },
  {
    path: '/register',
    element: <UserRegister />,
  },
  {
    path: '/admin/register',
    element: <AdminRegister />
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
