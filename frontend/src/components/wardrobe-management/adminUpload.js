import React, { useState } from 'react';
import axios from 'axios';

function AdminUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [itemCode, setItemCode] = useState(''); // New state for itemCode
    const [clothingName, setClothingName] = useState(''); // New state for clothingName
    const [clothingType, setClothingType] = useState('');
    const [colors, setColors] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile || !itemCode || !clothingType || !clothingName || !colors) {
            alert('Please provide all fields!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile); // File upload using 'file'
        formData.append('itemCode', itemCode); // Include itemCode
        formData.append('clothingType', clothingType);
        formData.append('clothingName', clothingName); // Include clothingName
        formData.append('colors', colors);

        try {
            // Send the file and metadata to the Node.js backend
            const response = await axios.post('http://localhost:8070/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage(response.data.message || 'Data saved successfully!');
        } catch (error) {
            console.error('Error during upload:', error);
            setMessage('Failed to upload data.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Admin Upload</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100"
                />
                <input
                    type="text"
                    value={itemCode} // New input for itemCode
                    onChange={(e) => setItemCode(e.target.value)}
                    placeholder="Item Code"
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    value={clothingName} // New input for clothingName
                    onChange={(e) => setClothingName(e.target.value)}
                    placeholder="Clothing Name"
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    value={clothingType}
                    onChange={(e) => setClothingType(e.target.value)}
                    placeholder="Clothing Type"
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    placeholder="Colors (comma-separated)"
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded shadow-md hover:bg-indigo-700">
                    Submit
                </button>
            </form>
            {imagePreviewUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
                    <img src={imagePreviewUrl} alt="Preview" className="max-w-full h-auto rounded shadow-md" />
                </div>
            )}
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
}

export default AdminUpload;
