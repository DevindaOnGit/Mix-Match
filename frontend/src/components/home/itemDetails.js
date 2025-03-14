import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../NavBar'; // Assuming you have a Navbar component
import Footer from '../global-components/footer'; // Assuming you have a Footer component

const ItemDetails = () => {
  const { item_code } = useParams(); // Get the item_code from the URL params
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  // Fetch item details on load or when item_code changes
  useEffect(() => {
    fetchItemDetails();
  }, [item_code]);

  // Function to fetch item details
  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/home/${item_code}`);
      setItem(response.data);
    } catch (err) {
      setError('Failed to fetch item details');
    }
  };

  // Function to handle Add to Cart
  const handleAddToCart = (item) => {
    const cartItem = {
      cItemCode: item.item_code,
      cItemName: item.item_name,
      cPrice: item.price,
      cImage: item.imageUrl,
      cQuantity: 1, // Default quantity as 1
    };

    // Add the item to the cart
    axios.post('http://localhost:8070/cart/add', cartItem)
      .then(() => {
        alert('Item added to cart successfully!');

        // After adding to cart, decrease the quantity
        axios.put(`http://localhost:8070/home/decrease/${item.item_code}`, {
          quantity: 1, // Decrease quantity by 1
        })
        .then((response) => {
          console.log('Quantity decreased successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error decreasing quantity:', error);
        });
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-12">
        {item ? (
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img
              className="w-full h-64 object-cover"
              src={`http://localhost:8070${item.imageUrl}`}
              alt={item.item_name}
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.item_name}</h2>
              <p className="text-gray-700 text-sm mb-4">
                Item Code: <span className="font-medium">{item.item_code}</span>
              </p>
              <p className="text-gray-700 text-sm mb-4">
                Category: <span className="font-medium">{item.category}</span>
              </p>
              <p className="text-2xl font-semibold text-gray-800 mb-4">${item.price}</p>

              {/* Centered Add to Cart button */}
              <div className="flex justify-center">
                <button
                  className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500 text-lg">
            {error ? error : 'Loading item details...'}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetails;
