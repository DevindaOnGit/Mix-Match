const express=require('express')
const {adminSignup,adminLogin,adminSignOut}=require('../controllers/adminController')

const router=express.Router();

router.post("/adminSignup",adminSignup);
router.post("/adminLogin",adminLogin);
router.get("/adminSignOut",adminSignOut);

//export default router;
module.exports=router