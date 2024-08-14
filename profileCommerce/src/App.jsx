import { useState ,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Header from './components/Header';
import Checkout from './pages/Checkout';


import './App.css'

function App() {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem('cartData')) || [];
    console.log(storedCart);
    
    setCartItem(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    console.log(updatedCart);
    setCartItem(updatedCart)
    localStorage.setItem('cartData', JSON.stringify(updatedCart));
  };
  return (
    <Router>
    <Header cartLength={cartItem.length} />
    <main >
      <Routes>
        <Route path="/profileCart" element={<Home addToCartEvent ={updateCart} />} />
        <Route path="/cart" element={<Cart removeFromCartEvent={updateCart}/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </main>
  </Router>
  );
}

export default App
