const mongoose=require('mongoose')

const Schema=mongoose.Schema

const adminSchema=new Schema({
    adminUsername:{
        type:String,
        required:true,
        unique:true
    },
    adminEmail:{
        type:String,
        required:true,
        unique:true
    },
    adminPassword:{
        type:String,
        required:true
    },
    

},{timestamps:true});

module.exports=mongoose.model('Admin',adminSchema)