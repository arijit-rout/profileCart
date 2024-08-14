import React from 'react';

const CartItem = ({ item, index, incrementQuantity, decrementQuantity, updateQuantity, removeItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center border p-4 rounded-lg shadow-md">
      <img
        src={item.image}
        alt={item.title}
        className="w-full sm:w-32 sm:h-32 h-48 object-cover mb-4 sm:mb-0 sm:mr-4 rounded"
      />
      <div className="flex-grow">
        <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
        <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
        <label>Quantity:</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => decrementQuantity(index)}
            className="bg-gray-300 text-gray-800 py-1 px-2 rounded"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={isNaN(item.quantity) || item.quantity === undefined ? 1 : item.quantity}
            onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
            className="border p-1 rounded w-16 text-center"
          />
          <button
            onClick={() => incrementQuantity(index)}
            className="bg-gray-300 text-gray-800 py-1 px-2 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => removeItem(index)}
        className="mt-4 sm:mt-0 sm:ml-4 bg-red-500 text-white py-2 px-4 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
