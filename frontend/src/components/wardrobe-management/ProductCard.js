import React from 'react';
import { useLocation } from 'react-router-dom';

function ProductCard() {
    const location = useLocation();
    const item = location.state; // Get the whole item object

    // Destructure properties safely
    const clothingType = item?.clothingType || 'Unknown';
    const itemCode = item?.itemCode || 'N/A';
    const imageUrl = item?.imageUrl; // Assuming imageUrl is part of the item object

    return (
        <div className="max-w-sm mx-auto p-4 border border-gray-300 rounded shadow-md">
            <h1 className="text-xl font-bold mb-2">{clothingType}</h1>
            {imageUrl && (
                <img
                    src={`http://localhost:8070/processed_images/${imageUrl.split('/').pop()}`}
                    alt={clothingType}
                    className="w-full h-auto rounded"
                />
            )}
            <p className="mt-2">Item Code: {itemCode}</p>
            {/* Add more details or actions as needed */}
        </div>
    );
}

export default ProductCard;
