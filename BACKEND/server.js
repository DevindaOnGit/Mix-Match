const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');



//wardrobe management routes


const PORT = process.env.PORT || 8070;

// CORS Configuration
app.use(
    cors({
      origin: 'http://localhost:3000', // Replace this with your frontend URL
      credentials: true, // Allow cookies and credentials across domains
    })
  );

app.use(bodyParser.json());
app.use(cookieParser());

const URL = process.env.MONGODB_URL;
console.log("MongoDB URL: ", URL); // Debugging: Check if URL is loaded

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/processed_images', express.static(path.join(__dirname, 'processed_images')));

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection success!");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));


//inventory management 
const userRoutes  =require ('./routes/user')
const authRouter=require('./routes/authRouter')
const adminRoutes  =require ('./routes/adminRouter')
app.use('/api/user',userRoutes);
app.use('/api/auth',authRouter);
app.use('/api/admin',adminRoutes);


//wardrobe management
const clothingRoutes = require('./routes/clothingRoutes');
app.use('/api', clothingRoutes);


//inventory management
const clothes = require("./routes/clothesRoutes.js");
app.use("/clothes", clothes);


//cart management
const CartRouter = require('./routes/cart_management/cart')
const CartClothesRouter = require('./routes/CartClothesRoutes')
app.use("/cart",CartRouter);
app.use("/home",CartClothesRouter);


// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Optionally log errors to the console for debugging
    console.error(`[Error] ${statusCode} - ${message}`);
  
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
