const router = require("express").Router();
const { time } = require("console");
 let Cart = require("../../models/cart_management/cart"); // give the path to get the manager file in models

 //crud 
 // create 
 //creating a method to call from the front end basicaly its the adress that calls 
 router.route("/add").post((req,res)=>{
    //method
    const cItemCode = req.body.cItemCode;
    const cItemName = req.body.cItemName;
    const cPrice = req.body.cPrice;
    const cImage = req.body.cImage;
    const cQuantity = req.body.cQuantity;
    

    const newCart = new Cart({
        cItemCode,
        cItemName,
        cPrice,
        cImage,
        cQuantity,
       
    })

    //to save and pass to the data base 
    //then catch used to exception handelling 
    newCart.save()
    .then(() => {
        res.json("Cart Items Added");
    })
    .catch((err) => { // Add 'err' as a parameter to the catch function
        console.log(err); // Now 'err' is correctly defined and can be logged
        res.status(500).json({ message: "Failed to add cart items" }); // Optional: Send an error response to the client
    });
 })

//read
 //to get registerd client details 

 router.route("/").get((req,res)=>{
    Cart.find().then((Cart)=>{
        res.json(Cart)
    }).catch((err)=>{
        console.log(err)
    })
 })

 //Update 
 //http//Localhost:8070/student/update/5gfdh5u8asdb
 //have to use the : to make sure that the id is not displayed in the url
 
 router.route("/update/:id").put(async(req,res) =>{
    //to assign the id to the variable  
    let userId = req.params.id;
    //dstructure 
    //we can use the method used in the create function as well
    //assigning values one by one
    const {cQuantity}= req.body;
     
    const updateCart={
        cQuantity,
        
    }

    const update = await Cart.findByIdAndUpdate (userId,updateCart).then(()=>{
        //to send an update to the frontend that the updation is successfull
        
    res.status(200).send({status:"Cart Updated"}) 
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with Updating data"});
    })

    
 })

 //delete
 //to delete a client
 router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Cart.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Cart Item Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete cart item",error: err.message});
    })
    
 })


 //to extract single useres data 
 router.route("/get/:id").get(async (req, res)=>{
    let userId = req.params.id;
   const item = await Cart.findById(userId)
    //if we want to use any other attrivute like email
    // await Client.findByOne(email);
    .then((Cart)=>{
        res.status(200).send({status:"Item Fetched",Cart}); 
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with Fetching Item",error: err.message});
    })
 })

 module.exports = router;
