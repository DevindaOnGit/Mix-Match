import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import AdminDashboard from '../../pages/AdminDashboard';

const CartDashboard = () => {
    const [cartItems, setCartItems] = useState([]);
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

    const generateReport = () => {
        const doc = new jsPDF();

        // Company Information
        doc.setFontSize(20);
        doc.text('Urban 94 - Shopping Cart Report', 10, 20);

        doc.setFontSize(12);
        doc.text(`Report Generated on: ${new Date().toLocaleDateString()}`, 10, 30);
        doc.text('Company: Urban 94', 10, 40);
        doc.text('Address: 123 Fashion Ave, New York, NY', 10, 50);
        doc.text('Contact: support@urban94.com | (555) 123-4567', 10, 60);

        // Item List Header
        doc.setFontSize(16);
        doc.text('Cart Items:', 10, 80);

        // Add Cart Items in the report
        let y = 90;
        cartItems.forEach((item, index) => {
            doc.setFontSize(12);
            doc.text(
                `${index + 1}. ${item.cItemName} - Size: ${item.cSize} - Quantity: ${item.cQuantity} - Price: $${item.cPrice}`, 
                10, y
            );
            y += 10;
        });

        // Add totals
        y += 10;
        doc.setFontSize(14);
        doc.text(`Subtotal: $${cartTotal.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Shipping Fee: $${shippingFee.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Total: $${(cartTotal + shippingFee).toFixed(2)}`, 10, y);

        // Footer
        y += 20;
        doc.setFontSize(10);
        doc.text('This is a system-generated report from Urban 94.', 10, y);
        doc.text('For inquiries, contact our customer support at support@urban94.com.', 10, y + 10);

        // Save PDF
        doc.save('urban94_cart_report.pdf');
    };

    return (
        <div>
            <AdminDashboard/>
        
        <div className="max-w-5xl mx-auto p-6 ">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Cart Report</h2>
            <div className="space-y-4">
                {cartItems.map((item, index) => (
                    <div key={item._id} className="bg-white shadow-md p-4 rounded-md">
                        <p>{index + 1}. {item.cItemName} - Quantity: {item.cQuantity} - Price: ${item.cPrice}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-700">Totals</h3>
                <p className="text-gray-600 mt-2">Subtotal: ${cartTotal.toFixed(2)}</p>
                <p className="text-gray-600 mt-2">Shipping Fee: ${shippingFee.toFixed(2)}</p>
                <p className="text-gray-800 font-bold mt-2">Total: ${(cartTotal + shippingFee).toFixed(2)}</p>
            </div>
            <button
                onClick={generateReport}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
                Download PDF Report
            </button>
        </div>
        </div>
    );
};

export default CartDashboard;
