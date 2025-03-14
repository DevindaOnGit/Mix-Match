const mongoose=require('mongoose')

const Schema=mongoose.Schema

const updateSchema = new Schema({
    field: { type: String, required: true },
    previousValue: { type: Schema.Types.Mixed, required: true },
    newValue: { type: Schema.Types.Mixed, required: true },
    updatedAt: { type: Date, default: Date.now },
  });

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
    },

    updateHistory: [updateSchema], // Array to store update history

},{timestamps:true});

module.exports=mongoose.model('User',userSchema)