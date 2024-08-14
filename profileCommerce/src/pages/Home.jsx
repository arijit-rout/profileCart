import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ addToCartEvent }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Add a product to the cart
  const addToCart = (product) => {
    product.quantity = 1;
    const itemsInCart = localStorage.getItem('cartData');
    let currentCart = [];

    // Retrieve existing cart items from localStorage
    if (itemsInCart) {
      currentCart = JSON.parse(itemsInCart);
    }

    // Update the cart with the new product
    const updatedCart = [...currentCart, product];
    setCart(updatedCart);
    localStorage.setItem('cartData', JSON.stringify(updatedCart));

    // Display a success notification
    toast.success(`1 item added to cart successfully!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Trigger the event if addToCartEvent is a function
    if (typeof addToCartEvent === 'function') {
      addToCartEvent(updatedCart);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
