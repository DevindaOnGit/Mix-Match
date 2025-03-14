const express=require('express')
const { test, updateUser, deleteUser,getAllUsers } = require('../controllers/userController'); 
const { verifyToken } = require('../utils/verifyUser');

const router=express.Router();

router.get('/test',test);
router.post('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.get('/', getAllUsers);
//router.get('/:id', getUser)

module.exports=router