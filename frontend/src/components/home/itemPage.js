import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClothesViewer = () => {
    const [item, setItem] = useState(null);
    const [index, setIndex] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchItem(index);
    }, [index]);

    const fetchItem = async (index) => {
        try {
            const response = await axios.get(`http://localhost:8070/home/item/${index}`);
            setItem(response.data);
            setError('');
        } catch (err) {
            setError('No more items to display');
        }
    };

    const handleNext = () => {
        setIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        if (index > 0) setIndex((prevIndex) => prevIndex - 1);
    };

    return (
        <div>
            {item ? (
                <div>
                    <h2>{item.item_name}</h2>
                    <p>Item Code: {item.item_code}</p>
                    <p>Category: {item.category}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <img src={`http://localhost:8070${item.imageUrl}`} alt={item.item_name} width="200" />
                    <div>
                        <button onClick={handlePrevious} disabled={index === 0}>Previous</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </div>
            ) : (
                <p>{error ? error : 'Loading...'}</p>
            )}
        </div>
    );
};

export default ClothesViewer;
