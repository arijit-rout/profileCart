import React from 'react';

const Products = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      
      {/* Product Image with Hover Effect */}
      <div 
        className="w-full h-48 mb-4 rounded-lg bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-105" 
        style={{ backgroundImage: `url(${product.image})` }}>
      </div>
      
      {/* Product Title */}
      <h2 className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
        {product.title}
      </h2>
      
      {/* Product Description */}
      <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
        {product.description}
      </p>
      
      {/* Product Price */}
      <p className="text-lg font-bold">
        ${product.price.toFixed(2)}
      </p>
      
      {/* Add to Cart Button */}
      <button
        onClick={() => onAddToCart(product)}
        className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all primaryBtn rounded hover:bg-white group py-1.5 px-2.5"
      >
        <span className="mobileHide w-56 h-48 rounded text-white bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
          Add to Cart
        </span>
      </button>
    </div>
  );
};

export default Products;
