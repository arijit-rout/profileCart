import React from 'react'

const Products = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div 
        className="w-full h-48 mb-4 rounded-lg bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-105" 
        style={{ backgroundImage: `url(${product.image})` }}>
      </div>
      <h2 className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{product.title}</h2>
      <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">{product.description}</p>
      <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 primaryBtn text-white py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Products;
