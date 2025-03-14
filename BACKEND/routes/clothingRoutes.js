const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Clothing = require('../models/clothingSchema');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/processed_images', express.static(path.join(__dirname, 'processed_images')));

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'processed_images/'); // Save images in 'processed_images' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`); // Just use a unique suffix for the filename
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload and save metadata to MongoDB
router.post('/upload', upload.single('file'), async (req, res) => {
    const { itemCode, clothingType, clothingName, colors } = req.body; // Include itemCode and clothingName
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create the image URL based on the saved file name
    const imageUrl = `/processed_images/${file.filename}`; // Construct URL to the image

    // Save metadata to MongoDB
    const newClothing = new Clothing({
        itemCode, // Save itemCode
        clothingType,
        clothingName, // Save clothingName
        colors: colors.split(','), // Convert comma-separated string to array
        imageUrl: imageUrl // Save the processed image URL
    });

    try {
        await newClothing.save();
        res.json({ message: 'Data saved successfully', imageUrl });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Route to match clothes based on colors
router.post('/match-clothes', async (req, res) => {
    const { colors } = req.body;

    try {
        // Query MongoDB for clothes with colors that match any of the provided colors
        const matchingClothes = await Clothing.find({ colors: { $in: colors } });
        res.json(matchingClothes);
    } catch (error) {
        console.error('Error fetching matching clothes:', error);
        res.status(500).json({ error: 'Failed to fetch matching clothes' });
    }
});

// Endpoint to fetch all images and their metadata from the database
router.get('/all-clothes', async (req, res) => {
    try {
        const allClothes = await Clothing.find(); // Fetch all clothing documents from MongoDB
        
        // Prepare the response with image URLs
        const response = allClothes.map(clothing => ({
            itemCode: clothing.itemCode,
            clothingType: clothing.clothingType,
            clothingName: clothing.clothingName,
            colors: clothing.colors,
            imageUrl: clothing.imageUrl // This will already contain the correct path
        }));

        res.json(response); // Send the data back as a JSON response
    } catch (error) {
        console.error('Error fetching all clothes:', error);
        res.status(500).json({ error: 'Failed to fetch all clothes' });
    }
});

module.exports = router;
