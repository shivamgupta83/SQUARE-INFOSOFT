const mongoose = require("mongoose")


let userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    dob:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timeStamps:true})


module.exports= mongoose.model("User",userSchema)