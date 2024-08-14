import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ removeFromCartEvent }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartData');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      setCart(cartItems);
    }
  }, []);

  const updateQuantity = (index, newQuantity) => {
    console.log(newQuantity);

    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      const updatedCart = cart.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cartData', JSON.stringify(updatedCart));
    }
  };

  const incrementQuantity = (index) => {
    updateQuantity(index, cart[index].quantity + 1);
  };

  const decrementQuantity = (index) => {
    updateQuantity(index, cart[index].quantity - 1);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cartData', JSON.stringify(updatedCart));
    if (removeFromCartEvent) {
      removeFromCartEvent(updatedCart);
    }
    toast.success('Item removed', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.1;
  };

  const shippingCharge = 5.99;

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + shippingCharge;
  };

  return (
    <div className="p-4 flex flex-col md:flex-row md:space-x-8">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <CartItem
                key={`${index}_${item.id}`}
                item={item}
                index={index}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
        )}
      </div>


      <>
        <div className="w-full md:w-1/3 p-4">
          <Link to="/">
          <button

className=" btn mb-4 relative  inline-flex items-center justify-start overflow-hidden font-medium transition-all primaryBtn rounded hover:bg-white group py-1.5 px-2.5 "
>

<span className="mobileHide w-56 h-48 rounded text-white bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
<span className=" relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-white">Add More Items</span>
</button>
          </Link>

          {cart.length !== 0 && <div className="border rounded-lg shadow-md bg-gray-50 p-4">
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
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
            <div className="flex justify-between mb-2">
              <span>Total Quantity:</span>
              <span>{calculateTotalQuantity()}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>

            <Link to="/checkout" >
              <button

                className=" btn relative  inline-flex items-center justify-start overflow-hidden font-medium transition-all primaryBtn rounded hover:bg-white group py-1.5 px-2.5"
              >

                <span className="mobileHide w-56 h-48 rounded text-white bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className=" relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-white">Checkout</span>
              </button>
            </Link>
          </div>}

        </div>
      </>

      <ToastContainer />
    </div>
  );
};

export default Cart;
