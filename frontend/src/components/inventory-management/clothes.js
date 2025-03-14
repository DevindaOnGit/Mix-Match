/* global Chart */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ClothesReturn from './return.js';
import jsPDF from 'jspdf';


export default function Clothes() {
    const [clothes, setClothes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
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
    const [salesTracker, setSalesTracker] = useState({});
    const [initialStock, setInitialStock] = useState({});
    // const [calculatePurchasedQuantity, setcalculatePurchasedQuantity] = useState({})


    
    

    useEffect(() => {
        axios.get('http://localhost:8070/clothes/')
            .then((res) => {
                setClothes(res.data);

                // Track the initial stock levels
                const initialStockData = {};
                res.data.forEach(item => {
                    initialStockData[item.item_code] = item.quantity; // Store initial quantity for each item
                });
                setInitialStock(initialStockData);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    // Define resetForm function
    const resetForm = () => {
        setItemCode('');
        setItemName('');
        setCategory('');
        setPrice('');
        setQuantity('');
        setAlertQuantity('');
        setSupplierId('');
        setSelectedFile(null);
    };

    //Function to handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            setImage(file); // Store the image file in state
        }

        setSelectedFile(file);

        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
    };

    // Function to handle delete clothes
    const handleDeleteClothes = (itemCode) => {
        axios.delete(`http://localhost:8070/clothes/delete/${itemCode}`)
            .then(() => {
                setClothes(clothes.filter(clothes => clothes.item_code !== itemCode));
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // Function to handle search
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    // Function to open add modal
    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    // Function to open update modal and set selected clothes
    const handleOpenUpdateModal = (clothes) => {
        setSelectedClothes(clothes);
        setItemCode(clothes.item_code);
        setItemName(clothes.item_name);
        setCategory(clothes.category);
        setPrice(clothes.price);
        setQuantity(clothes.quantity);
        setAlertQuantity(clothes.alert_quantity);
        setShowUpdateModal(true);
    };

    // Function to handle form submission for both create and update
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            setError('');

            if (!itemCode || !itemName || !category || !price || !quantity || !alertQuantity ) {
                setError('All fields are required.');
                return;
            }

            const formData = new FormData(); // Create a FormData object
            formData.append('item_code', itemCode);
            formData.append('item_name', itemName);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('alert_quantity', alertQuantity);
            formData.append('supplier_id', supplier_id);
            formData.append('file', selectedFile); // Append the image file

            if (selectedClothes) {
                // Get previous stock level before updating
                const previousQuantity = selectedClothes.quantity;
                const newQuantity = parseInt(quantity);

                // Store the reduction in stock
                const reducedQuantity = previousQuantity - newQuantity;
                console.log(`Item ${itemName} reduced by ${reducedQuantity} before restocking.`);
                
                await axios.put(`http://localhost:8070/clothes/update/${selectedClothes.item_code}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Set the content type for file uploads
                    }
                });

                // Update the previous stock level in the state
                setPreviousStockLevels((prev) => ({
                    ...prev,
                    [itemCode]: previousQuantity,
                }));

                resetForm();
                setShowUpdateModal(false);
            } else {
                // Check if the item code already exists
                const isDuplicate = clothes.some(clothes => clothes.item_code === itemCode);
                if (isDuplicate) {
                    setError('Item code already exists.');
                    return;
                }

                await axios.post('http://localhost:8070/clothes/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Set the content type for file uploads
                    }
                });

                resetForm();
                setShowAddModal(false);
            }

            window.location.reload();

            const res = await axios.get('http://localhost:8070/clothes/');
            setClothes(res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred.');
        }
    };

    // Filter clothes based on search query
    const filteredClothes = clothes.filter(clothes =>
        clothes.item_code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    

    const generateReport = () => {
        // Get current date and time for report generation
        const reportGenerationTime = new Date().toLocaleString();
    
        // Prepare the report data with all item details except initial quantity
        const reportData = clothes.map(item => {
            return {
                itemName: item.item_name,
                itemCode: item.item_code,
                currentQuantity: item.quantity,
                price: item.price, // Assuming there's a price field for each item
                category: item.category, // Assuming there's a category field for each item
            };
        });
    
        // Generate the report in a new window
        const reportWindow = window.open("", "_blank", "width=800,height=600");
    
        // Write the report data into the new window
        reportWindow.document.write(`
            <html>
                <head><title>Clothes Inventory Report</title></head>
                <body>
                    <h1>Urban 94' Clothes Inventory Report</h1>
                    <p><strong>Report Generated At:</strong> ${reportGenerationTime}</p>
                    <table border="1" cellpadding="10" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Code</th>
                                <th>Current Quantity</th>
                                <th>Price</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.map(item => `
                                <tr>
                                    <td>${item.itemName}</td>
                                    <td>${item.itemCode}</td>
                                    <td>${item.currentQuantity}</td>
                                    <td>${item.price}</td>
                                    <td>${item.category}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
    
        reportWindow.document.close();
    };
    

    const generateReportPDF = () => {
        const doc = new jsPDF();
        
        // Get current date and time for report generation
        const reportGenerationTime = new Date().toLocaleString();
    
        // Set title, company name, and report generation time
        doc.setFontSize(18);
        doc.text("Urban 94' Clothes Inventory Report", 14, 22);
        doc.setFontSize(12);
        doc.text(`Report Generated At: ${reportGenerationTime}`, 14, 32); // Time of generation
        
        // Set column headers
        doc.text("Item Name", 14, 50);
        doc.text("Item Code", 64, 50);
        doc.text("Current Quantity", 104, 50);
        doc.text("Price", 144, 50);
        doc.text("Category", 184, 50);
    
        // Add the report data (without initial quantity)
        let y = 60;
        clothes.forEach(item => {
            doc.text(item.item_name, 14, y);
            doc.text(item.item_code, 64, y);
            doc.text(String(item.quantity), 104, y);
            doc.text(String(item.price), 144, y);
            doc.text(item.category, 184, y);
            y += 10;  // Move to the next line for each item
        });
    
        // Save the PDF
        doc.save('clothes_inventory_report.pdf');
    };
    
    
    

    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);

    // Function to open delete confirmation modal
    const handleOpenDeleteConfirmationModal = (clothes) => {
        setSelectedItemForDelete(clothes);
    };

    // Function to handle canceling deletion
    const handleCancelDelete = () => {
        setSelectedItemForDelete(null);
    };

    // Function to handle confirming deletion
    const handleConfirmDelete = () => {
        if (selectedItemForDelete) {
            handleDeleteClothes(selectedItemForDelete.item_code);
            setSelectedItemForDelete(null); // Close the modal after deletion
        }
    };
    
    
    

    return (
            <ClothesReturn
                clothes={clothes}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                handleOpenAddModal={handleOpenAddModal}
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                handleFormSubmit={handleFormSubmit}
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
                handleImageUpload={handleImageUpload}
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                selectedItemForDelete={selectedItemForDelete}
                handleCancelDelete={handleCancelDelete}
                handleConfirmDelete={handleConfirmDelete}
                filteredClothes={filteredClothes}
                handleOpenUpdateModal={handleOpenUpdateModal}
                handleOpenDeleteConfirmationModal={handleOpenDeleteConfirmationModal}
                generateReportPDF={generateReportPDF}
                generateReport={generateReport}
            /> 
            
    );
}