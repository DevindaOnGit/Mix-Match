const mongoose = require('mongoose');

// Define schema for clothing data
const clothingSchema = new mongoose.Schema({
    itemCode: { type: String, required: true }, // Add itemCode
    clothingType: { type: String, required: true },
    clothingName: { type: String, required: true }, // Add clothingName
    colors: { type: [String], required: true },
    imageUrl: { type: String, required: true }
});

// Create a model from the schema
const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;
