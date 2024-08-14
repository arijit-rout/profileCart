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
        window.location.href = "/";
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

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <button
          onClick={handleConfirmOrder}
          className="w-full md:w-1/2 primaryBtn text-white py-2 px-4 rounded"
        >
          Confirm Order
        </button>
        <Link to="/" className="w-full md:w-1/2">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
            Add More Items
          </button>
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Checkout;
