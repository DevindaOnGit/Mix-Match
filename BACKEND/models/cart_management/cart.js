const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    cItemCode: {
        type: String,
        required: true
    },
    cItemName: {
        type: String,
        required: true
    },
    cPrice: {
        type: Number,
        required: true
    },
    cImage: {
        type: String,
        
    },
    cQuantity: {
        type: Number,
        required: true,
        default: 1
    },
    cCartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    cCartTotal: {
        type: Number,
        
    }
}, { timestamps: true });


const Cart = mongoose.model("CartItem",CartItemSchema);
module.exports = Cart;