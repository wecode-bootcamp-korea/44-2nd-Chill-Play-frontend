import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Main from './pages/Main/Main';
import Booking from './pages/Booking/Booking';
import Payment from './pages/Payment/Payment';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import KakaoAuth from './pages/SignIn/KakaoAuth/KakaoAuth';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/oauth/callback/kakao" element={<KakaoAuth />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
