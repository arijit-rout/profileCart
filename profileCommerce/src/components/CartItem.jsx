import React from 'react';

const CartItem = ({ item, index, incrementQuantity, decrementQuantity, updateQuantity, removeItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center border p-4 rounded-lg shadow-lg bg-white mb-4">
      
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full sm:w-36 sm:h-36 h-48 object-cover mb-4 sm:mb-0 sm:mr-4 rounded-lg shadow-md"
      />
      
      {/* Product Details */}
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
        <p className="text-lg font-bold mb-2">${item.price.toFixed(2)}</p>
        
        {/* Quantity Section */}
        <div className="flex items-center mb-2">
          <label className="text-lg font-medium mr-4">Quantity:</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => decrementQuantity(index)}
              className="bg-gray-300 text-gray-800 py-1 px-3 rounded-lg shadow-sm hover:bg-gray-400 transition"
            >
              -
            </button>
            <span className="font-semibold text-gray-800 bg-gray-200 py-1 px-3 rounded-lg flex items-center justify-center">
              {item.quantity}
            </span>
            <button
              onClick={() => incrementQuantity(index)}
              className="bg-gray-300 text-gray-800 py-1 px-3 rounded-lg shadow-sm hover:bg-gray-400 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    
      {/* Remove Button */}
      <button
        onClick={() => removeItem(index)}
        className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all dangerBtn rounded hover:bg-white group py-1.5 px-2.5"
      >
        <span className="mobileHide w-56 h-48 rounded text-white bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
          Remove
        </span>
      </button>
    </div>
  );
};

export default CartItem;
