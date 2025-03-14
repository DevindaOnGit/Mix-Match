import './App.css';
import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'; // Ensure BrowserRouter is imported

import Header from './components/global-components/header';
import Footer from './components/global-components/footer';
import Home from './components/global-components/homepage';
import Wardrobe from './components/wardrobe-management/wardrobePage';
import AdminUpload from './components/wardrobe-management/adminUpload';
import VideoStream from './components/wardrobe-management/videoStream';
import Clothes from './components/inventory-management/clothes';
import NavBar from './components/NavBar';
import AdminNavBar from './components/global-components/adminNavBar'; // Import the new AdminNavBar
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'; 
import PrivateRoute from './components/accounts-management/PrivateRoute';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';
import UserList from './components/accounts-management/UserList';
import AboutUs from './components/global-components/AboutUs';
import Cart from './components/cart-mamagement/Cart';
import Shop from './components/home/ShophomePage';
//import ClothesViewer from './components/home/itemPage';
import ItemDetails from './components/home/itemDetails';
import ClothesReturn from './components/home/returnHomePage';
import CartDashboard from './components/cart-mamagement/CartDashBoard';

function App() { 
  const location = useLocation();
  // const isAdminRoute = location.pathname.startsWith('/admin'); 

  return (
    <div className="App">
      
      {/* {isAdminRoute ? <AdminNavBar /> : <NavBar />} */}
      
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/upload" element={<AdminUpload />} />
          <Route path="/video" element={<VideoStream />} />
          <Route path="/about" element={<AboutUs />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          
          <Route path="/UserList" element={<UserList />} />
          <Route path="/Clothes" element={<Clothes />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminSignup" element={<AdminSignup />} />
          <Route path="/admin" element={<AdminDashboard />} /> {/* Allow for nested admin routes */}

          <Route path="/cart" element={<Cart/>}/>
          <Route path="/home" element={<Shop/>}/>
          {/* <Route path="/item" element={<ClothesViewer/>}/> */}
          <Route path="/item/:item_code" element={<ItemDetails/>}/>
          <Route path="/" element={<ClothesReturn />} />
          <Route path="/cart-dashboard" element={<CartDashboard/>} />

        </Routes>
      </div>
    </div>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Main;
