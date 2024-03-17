import './App.css';
import Footer from './components/Footer'
import AdminHeader from './components/adminHeader';
import { Outlet } from 'react-router-dom';

function AdminApp() {
  return (
    <>  
        <AdminHeader />
        <Outlet/>
        <Footer/>
    </>
  
  );
}

export default AdminApp;