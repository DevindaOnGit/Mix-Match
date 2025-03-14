const router = require('express').Router();
const clothes = require('../models/clothesModel.js');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Files will be stored in the uploads directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique file name
    }
});

const upload = multer({ storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed'), false);
        }
    }
 });

// Endpoint to handle file upload and save metadata to MongoDB
router.post('/upload', upload.single('file'), async (req, res) => {
    const item_code = req.body.item_code;
    const item_name = req.body.item_name;
    const category = req.body.category;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const alert_quantity = req.body.alert_quantity;
    const supplier_id = req.body.supplier_id;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${file.filename}`; // File URL

    try {
        // Save the data to MongoDB
        const newClothesStock = new clothes({
            item_code,
            item_name,
            category,
            price,
            quantity,
            alert_quantity,
            supplier_id,
            imageUrl
    
        })
        await newClothesStock.save();

        res.json({ message: 'Data saved successfully', imageUrl });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

router.route("/").get((req,res)=>{
    clothes.find().then((clothesmodel)=>{
        res.json(clothesmodel)
    }).catch((err)=>{
        console.log(err)
    })
})

router.put('/update/:item_code', upload.single('file'), async (req, res) => {
    const itm_code = req.params.item_code;
    const { item_code, item_name, category, price, quantity, alert_quantity } = req.body;
    const file = req.file; // New image file

    try {
        // Find the existing clothes item
        const foundClothes = await clothes.findOne({ item_code: itm_code });

        if (!foundClothes) {
            return res.status(404).send({ status: 'Clothes not found' });
        }

        // If a new file is uploaded, update the imageUrl, else retain the old one
        let imageUrl = foundClothes.imageUrl; // Retain the old image by default

        if (file) {
            // Set the new image URL
            imageUrl = `/uploads/${file.filename}`;

            // Optional: Delete the old image from the server if needed
            if (foundClothes.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', foundClothes.imageUrl);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.log('Failed to delete old image:', err);
                });
            }
        }

        // Update the clothes record with the new data
        const updatedClothes = {
            item_code,
            item_name,
            category,
            price,
            quantity,
            alert_quantity,
            imageUrl // Include the updated or retained imageUrl
        };

        const updatedclothes = await clothes.findOneAndUpdate({ item_code: itm_code }, updatedClothes, { new: true });

        res.status(200).send({ status: 'Clothes Details updated', updatedclothes });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'Error with Updating Details' });
    }
});


router.route("/delete/:item_code").delete(async (req, res) => {
    let itm_code = req.params.item_code;

    try {
        const deletedclothes = await clothes.findOneAndDelete({ item_code: itm_code });

        if (deletedclothes) {
            // Optional: Delete the image file if the item is deleted
            if (deletedclothes.imageUrl) {
                const imagePath = path.join(__dirname, '..', deletedclothes.imageUrl);
                fs.unlink(imagePath, (err) => {
                    if (err) console.log('Failed to delete image:', err);
                });
            }

            res.status(200).send({ status: 'Clothes deleted', deletedclothes });
        } else {
            res.status(404).send({ status: 'Clothes not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'Error with deleting clothes' });
    }
});

router.route("/:id").get((req, res) => {
    const item_code = req.params.id;

    clothes.findOne({ item_code: item_code }).then((clothes) => {
        if (!clothes) {
            return res.status(404).json({ error: "clothes not found" });
        }
        res.json(clothes);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Failed to get clothes details" });
    });
});



router.route("/price/:item_code").get(async (req, res) => {
    let itm_code = req.params.item_code;

    try {
        // Find the clothes based on the custom item_code
        const foundclothes = await clothes.findOne({ item_code: itm_code });

        if (foundclothes) {
            // Retrieve and send the quantitys of the found clothes
            const price = foundclothes.price;
            res.status(200).send({ price });
        } else {
            res.status(404).send({ status: "clothes not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Error retrieving quantitys" });
    }
})

router.route("/decrement/:item_code").put(async (req, res) => {
    const item_code = req.params.item_code;
    const purchasedQuantity = req.body.quantity; // Access quantity from request body

    try {
        const clothe = await clothes.findOne({ item_code });
        if (!clothe) {
            return res.status(404).json({ error: "Clothes not found" });
        }

        const updatedQuantity = clothe.quantity - purchasedQuantity;
        if (updatedQuantity < 0) {
            return res.status(400).json({ error: "Insufficient quantity" });
        }

        clothe.quantity = updatedQuantity;

        await clothe.save();
        res.json({ message: "Clothes quantity updated", updatedQuantity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.route("/decrease/:item_code").put(async (req, res) => {
    const itm_code = req.params.item_code;
    const quantityToDecrease = req.body.quantity; // Quantity to decrease

    try {
        // Find the clothes based on the custom item_code
        const foundClothes = await clothes.findOne({ item_code: itm_code });

        if (foundClothes) {
            // Check if there's enough quantity to decrease
            if (foundClothes.quantity >= quantityToDecrease) {
                // Decrease the quantity
                foundClothes.quantity -= quantityToDecrease;
                
                // Save the updated quantity
                await foundClothes.save();

                res.status(200).send({ status: "Quantity decreased", updatedClothes: foundClothes });
            } else {
                res.status(400).send({ status: "Not enough quantity to decrease" });
            }
        } else {
            res.status(404).send({ status: "Clothes not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Error decreasing quantity" });
    }
})


  


module.exports = router;