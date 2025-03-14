import fallbackImage from '../../images/Black_Tee.png.webp';

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
    const imageUrl = `http://localhost:8070${item.cImage}`;
    const { _id, cImage, cItemName, cPrice, cQuantity, cSize } = item;

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
            onQuantityChange(_id, newQuantity);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {/* Image Section */}
            <img 
                src={imageUrl} 
                alt={cItemName} 
                className="w-20 h-20 object-cover rounded"
                onError={(e) => e.target.src = fallbackImage} // Fallback image
            />

            {/* Item Details Section */}
            <div className="ml-4 flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{cItemName}</h4>
                <p className="text-gray-600">Price: ${cPrice.toFixed(2)}</p>
                <p className="text-gray-600">Size: M{cSize}</p>

                <div className="mt-2">
                    <label htmlFor={`quantity-${_id}`} className="text-gray-600 mr-2">Quantity:</label>
                    <input
                        id={`quantity-${_id}`}
                        type="number"
                        value={cQuantity}
                        onChange={handleQuantityChange}
                        className="w-16 p-1 border border-gray-300 rounded text-center"
                    />
                </div>

                <p className="mt-2 font-semibold text-gray-700">Total: ${(cPrice * cQuantity).toFixed(2)}</p>
            </div>

            {/* Remove Button */}
            <button 
                onClick={() => onRemoveItem(_id)} 
                className="ml-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;
