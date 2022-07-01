import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useLayoutEffect } from 'react';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import Shop from './pages/Shop.js';
import Accessories from './pages/Accessories';
import Equipment from './pages/Equipment';
import Supplements from './pages/Supplements';
import SpecificProduct from './pages/SpecificProduct.js';
import Cart from './pages/Cart.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Profile from './pages/Profile.js';
import Shipping from './pages/Shipping.js';
import Payment from './pages/Payment.js';
import PlaceOrder from './pages/PlaceOrder.js';
import Order from './pages/Order.js';

function App() {
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <Router>
      <Header />
      <Wrapper>
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/shop" element={<Shop />} exact />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/supplement" element={<Supplements />} />
            <Route path="/accessories/:id" element={<SpecificProduct />} />
            <Route path="/equipment/:id" element={<SpecificProduct />} />
            <Route path="/supplement/:id" element={<SpecificProduct />} />
            <Route path="/cart">
              <Route path=":id" element={<Cart />} />
              <Route path="" element={<Cart />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<Order />} />
          </Routes>
        </main>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default App;
