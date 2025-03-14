const express=require('express')
const {signup, login, google, signOut}=require('../controllers/authController')

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post('/google',google);
router.get("/signout",signOut);

//export default router;
module.exports=router