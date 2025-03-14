/* global Chart */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ClothesReturn from './returnHomePage.js';


export default function Clothes() {
    const [clothes, setClothes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClothes, setSelectedClothes] = useState(null);
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [alertQuantity, setAlertQuantity] = useState('');
    const [supplier_id, setSupplierId] = useState('');
    const [error, setError] = useState('');
    const [quantityChartData, setQuantityChartData] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [previousStockLevels, setPreviousStockLevels] = useState({});

    
    

    useEffect(() => {
        axios.get('http://localhost:8070/home/')
            .then((res) => {
                setClothes(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);



    // Function to handle search
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    

    

    

    // Filter clothes based on search query
    const filteredClothes = clothes.filter(clothes =>
        clothes.item_code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    
    

    return (
        <ClothesReturn
            clothes={clothes}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            error={error}
            itemCode={itemCode}
            setItemCode={setItemCode}
            itemName={itemName}
            setItemName={setItemName}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            alertQuantity={alertQuantity}
            setAlertQuantity={setAlertQuantity}
            supplierId={supplier_id}
            setSupplierId={setSupplierId}
            filteredClothes={filteredClothes}
        /> 

            
    );
}