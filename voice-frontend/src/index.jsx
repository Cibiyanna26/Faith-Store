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
import Product from './components/Products/Product';
import Home from './components/Dashboard/Home';
import Cart from './components/Cartpage/Cart';
import { Provider } from 'react-redux';
import {store , persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import SuccessPurchase from './components/SuccessPurchase';
import Purchase from './components/PurchasePage/Purchase';
import NotAuth from './components/notAuth';
import AdminApp from './AdminApp';
import AdminDashboard from './components/admin/Dashboard/adminDashboard';
import NotFound from './components/notFound';
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Navigate to="/home" replace/>,
    errorElement: <NotFound />
  },
  {
    path:'/admin',
    element:<Navigate to="/admin/dashboard" replace/>,
    errorElement: <NotFound />
  },
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/product',
        element:<Product/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/purchase',
        element:<Purchase/>
      }
    ],
    errorElement: <NotFound/>
  },
  {
    path: '/',
    element: <AdminApp/>,
    children:[
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />
      }
    ],
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <UserLogin />,
    errorElement: <NotFound />
  },
  {
    path:'/admin/login',
    element:<AdminLogin/>,
    errorElement: <NotFound />
  },
  {
    path: '/register',
    element: <UserRegister />,
    errorElement: <NotFound />
  },
  {
    path: '/admin/register',
    element: <AdminRegister />,
    errorElement: <NotFound />
  },
  {
    path:'/purchase-success',
    element:<SuccessPurchase/>,
    errorElement: <NotFound />
  },
  {
    path: '/unauth',
    element: <NotAuth />
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
