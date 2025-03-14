// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function WardrobePage() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [prediction, setPrediction] = useState(null);
//     const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
//     const [matchingClothes, setMatchingClothes] = useState([]);

//     // Handle file selection
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         setSelectedFile(file);

//         // Create a preview URL for the selected image
//         const previewUrl = URL.createObjectURL(file);
//         setImagePreviewUrl(previewUrl);
//     };

//     // Handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!selectedFile) {
//             alert('Please select a file first!');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', selectedFile);

//         try {
//             // Step 1: Send the image to the Flask backend
//             const response = await axios.post('http://localhost:5000/upload', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             const { class: classIndex, clothing_name, colors, item_code } = response.data;
//             setPrediction({ classIndex, clothing_name, colors, item_code });

//             // Step 2: Send the colors to the Express backend to fetch matching clothes
//             const matchResponse = await axios.post('http://localhost:8070/api/match-clothes', { colors });

//             if (matchResponse.data.length > 0) {
//                 setMatchingClothes(matchResponse.data);
//             } else {
//                 setMatchingClothes([]);
//             }
//         } catch (error) {
//             console.error('Error during image prediction or matching clothes:', error);
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4 text-center">Upload Image for Prediction</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//                         file:rounded-full file:border-0
//                         file:text-sm file:font-semibold
//                         file:bg-indigo-50 file:text-indigo-700
//                         hover:file:bg-indigo-100"
//                 />
//                 <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded shadow-md hover:bg-indigo-700">
//                     Submit
//                 </button>
//             </form>
//             {imagePreviewUrl && (
//                 <div className="mt-6">
//                     <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
//                     <img src={imagePreviewUrl} alt="Preview" className="max-w-full h-auto rounded shadow-md" />
//                 </div>
//             )}
//             {prediction && (
//                 <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
//                     <p className="font-medium">Predicted Class Index: {prediction.classIndex}</p>
//                     <p className="font-medium">Predicted Clothing Name: {prediction.clothing_name}</p>
//                     <p className="font-medium">Item Code: {prediction.item_code}</p>
//                     <div className="mt-4">
//                         <h3 className="font-semibold">Dominant Colors:</h3>
//                         <div className="flex gap-2 mt-2">
//                             {prediction.colors.map((color, index) => (
//                                 <div
//                                     key={index}
//                                     style={{ backgroundColor: color }}
//                                     className="w-12 h-12 rounded-full shadow-md flex items-center justify-center"
//                                 >
//                                     <span className="text-xs text-white">{color}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {matchingClothes.length > 0 && (
//                 <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
//                     <h3 className="font-semibold mb-2">Matching Clothes:</h3>
//                     <div className="flex flex-wrap gap-4">
//                         {matchingClothes.map((item, index) => (
//                             <div key={index} className="flex flex-col items-center">
//                                 <img src={`http://localhost:8070/processed_images/${item.imageUrl.split('/').pop()}`} className="w-24 h-24 rounded shadow-md" />
//                                 <p className="text-sm">Clothing Type: {item.clothingType}</p>
//                                 <p className="text-sm">Item Code: {item.itemCode}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default WardrobePage;


import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import Footer from '../global-components/footer';

function WardrobePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [matchingClothes, setMatchingClothes] = useState([]);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Step 1: Send the image to the Flask backend
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const { class: classIndex, clothing_name, colors, item_code } = response.data;
            setPrediction({ classIndex, clothing_name, colors, item_code });

            // Step 2: Send the colors to the Express backend to fetch matching clothes
            const matchResponse = await axios.post('http://localhost:8070/api/match-clothes', { colors });

            if (matchResponse.data.length > 0) {
                setMatchingClothes(matchResponse.data);
            } else {
                setMatchingClothes([]);
            }
        } catch (error) {
            console.error('Error during image prediction or matching clothes:', error);
        }
    };

    return (
        <div>
            <NavBar/>
        
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Snap, <span className="text-white bg-black p-1">Upload</span> and Discover Your Style!
            </h1>
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
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded shadow-md hover:bg-indigo-700">
                    Discover
                </button>
            </form>
            {imagePreviewUrl && (
                <div className="mt-6 flex items-start">
                    <img src={imagePreviewUrl} alt="Preview" className="max-w-xs h-auto rounded shadow-md mr-4" />
                    {prediction && (
                        <div className="p-4 border border-gray-300 rounded shadow-md bg-gray-50">
                            {/* <h2 className="font-medium">Predicted Clothing Name: {prediction.clothing_name}</h2> */}
                            <div className="mt-4">
                                <h3 className="font-semibold">Dominant Colors:</h3>
                                <div className="flex gap-2 mt-2">
                                    {prediction.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            style={{ backgroundColor: color }}
                                            className="w-12 h-12 rounded-full shadow-md flex items-center justify-center"
                                        >
                                            <span className="text-xs text-white">{color}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {matchingClothes.length > 0 ? (
                <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
                    <h3 className="font-semibold mb-2">Matching Clothes:</h3>
                    <div className="flex flex-wrap gap-4">
                        {matchingClothes.map((item, index) => (
                            <div key={index} className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                                <img 
                                    className="h-48 w-full object-contain object-center" 
                                    src={`http://localhost:8070/processed_images/${item.imageUrl.split('/').pop()}`} 
                                    alt={item.clothingType} 
                                />
                                <div className="p-4">
                                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{item.clothingType}</h2>
                                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">Description goes here.</p>
                                    <div className="flex items-center">
                                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">$20.00</p>
                                        <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
                                        <p className="ml-auto text-base font-medium text-green-500">20% off</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                matchingClothes.length === 0 && (
                    <div className="mt-6 p-4 border border-gray-300 rounded shadow-md text-center bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-700">No Matching Clothes Found</h3>
                        <p className="text-gray-500">Don't worry! Here are some tips to help you find your perfect style:</p>
                        <ul className="mt-2 list-disc list-inside text-left text-gray-600">
                            <li>Try uploading a different image.</li>
                            <li>Check out our latest collections.</li>
                            <li>Browse by color or type in our catalog.</li>
                        </ul>
                    </div>
                )
            )}
        </div>
        
        </div>
    );
}

export default WardrobePage;
