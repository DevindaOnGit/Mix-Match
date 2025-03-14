import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import Navbar from '../NavBar';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [cartTotal, setCartTotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const res = await axios.get('http://localhost:8070/cart/');
            setCartItems(res.data);
            calculateCartTotal(res.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateCartTotal = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.cPrice * item.cQuantity;
        });
        setCartTotal(total);
        setShippingFee(total > 0 ? 0 : 10); // Example shipping fee logic
    };

    const handleQuantityChange = async (id, quantity) => {
        try {
            await axios.put(`http://localhost:8070/cart/update/${id}`, { cQuantity: quantity });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/cart/delete/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const handleApplyPromoCode = () => {
        // Logic for applying promo code 
        alert('Promo code applied!');
    };

    return (
        <div>
            <Navbar/>
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
            <div className="space-y-4">
                {cartItems.map(item => (
                    <CartItem
                        key={item._id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                    />
                ))}
            </div>
            <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
                <p className="mb-2">Subtotal: <span className="font-semibold">${cartTotal.toFixed(2)}</span></p>
                <p className="mb-2">Shipping Fee: <span className="font-semibold">${shippingFee.toFixed(2)}</span></p>
                <p className="text-xl font-semibold">Total: <span className="text-blue-600">${(cartTotal + shippingFee).toFixed(2)}</span></p>
                <div className="mt-6 flex space-x-3 items-center">
                    <input
                        type="text"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        placeholder="Enter promo code"
                        className="p-2 border border-gray-300 rounded flex-1 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <button 
                        onClick={handleApplyPromoCode}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
                        Apply
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Cart;
