import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cartData');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.1;
  };

  const shippingCharge = 5.99;

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + shippingCharge;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleConfirmOrder = () => {
    const { name, address, city, postalCode, country } = shippingInfo;

    if (name && address && city && postalCode && country) {
      toast.success('Order placed successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      localStorage.removeItem('cartData');
      setTimeout(() => {
        window.location.href = "/profileCart";
      }, 1000);
    } else {
      toast.error('Please fill in all the shipping information fields correctly.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Shipping Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleInputChange}
            placeholder="City"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="country"
            value={shippingInfo.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Cart Total:</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount:</span>
          <span>-${calculateDiscount().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Charge:</span>
          <span>${shippingCharge.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-row md:flex-row items-center md:space-x-4 md:space-y-0">
        <Link  className="w-full md:w-1/2">
        <button onClick={handleConfirmOrder} className=" btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all primaryBtn rounded hover:bg-white group py-1.5 px-2.5">
        <span className="mobileHide w-56 h-48 rounded bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className=" relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Confirm Order</span>
        </button>
        </Link>
        
        <Link to="/profileCart" className="w-full md:w-1/2">
        <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all primaryBtn rounded hover:bg-white group py-1.5 px-2.5">
        <span className="mobileHide w-56 h-48 rounded bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Add More Items</span>
        </button>
        </Link>
        
      </div>

      <ToastContainer />
    </div>
  );
};

export default Checkout;
