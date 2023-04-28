const userModel=require("../models/userModel")
const {validAll,validName,validemail,validDate}= require("../validation/validation")
const jwt= require("jsonwebtoken")


const createUser=async(req,res)=>{

try
{
const body=req.body;
const keys=Object.keys(body);

keys.map((keys)=>{if(!["email","password","name","dob"].includes(keys)) return res.status(400).send({status:false,message:`${keys} is not valid plese enter only email, password, name, dob`})})

let {email, password, name, dob}= body;

if(!email) return res.status(400).send({status:false,message:"email is not presnt"})
if(!validAll(email)) return res.status(400).send({status:false,message:"email is not valid"})
if(!validemail(email)) return res.status(400).send({status:false,message:"email is not valid"})

if(!password) return res.status(400).send({status:false,message:"password is not presnt"})
if(!validAll(password)) return res.status(400).send({status:false,message:"password is not valid"})


if(!name) return res.status(400).send({status:false,message:"name is not presnt"})
name=name.replace(/\s+/g, ' ')
if(!validAll(name)) return res.status(400).send({status:false,message:"name is not valid"})
if(!validName(name)) return res.status(400).send({status:false,message:"name is not valid"})

if(!dob) return res.status(400).send({status:false,message:"dob is not presnt"})
if(!validAll(dob)) return res.status(400).send({status:false,message:"dob is not valid"})
if(!validDate(dob)) return res.status(400).send({status:false,message:"dob is not valid"})

const savedData= await userModel.create(body)

const data={
    _id:savedData._id,
    email:savedData.email,
    password:savedData.password,    
}

const token = jwt.sign(data,"key")
return res.status(201).send({status:true,"Access token":token})
}
catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}


const getUser=async(req,res)=>{
try
{
let findData= req.userData
delete findData.iat

let userData= await userModel.findOne(findData)
if(!userData) return res.status(400).send({status:false,message:"user is not present"})
if(userData.isDeleted) return res.status(400).send({status:false,message:"user is already deleted"})

return res.status(200).send({status:true,userData:userData})
}
catch(err){
    return res.status(500).send({status:false,message:err.message})
}

}


const getUserBYId=async(req,res)=>{
try
{
    let findData=req.query.user_id
let userData= await userModel.findOne({_id:findData})
if(!userData) return res.status(400).send({status:false,message:"user is not present in DB"})
if(userData.isDeleted) return res.status(400).send({status:false,message:"user is deleted"})

return res.status(200).send({status:true,userData:userData})
}
catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}


const getAllUser=async(req,res)=>{
    try
    {
    let userData= await userModel.find({isDeleted:false})
    if(userData.length==0) return res.status(400).send({status:false,message:"users is not present"})

    return res.status(200).send({status:true,userData:userData})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


const deleteUser=async(req,res)=>{

    try
    {
    let findData=req.query.user_id
    let deletedUser=await userModel.findOne({_id:findData})

if(!deletedUser) return res.status(400).send({message:"unSuccess"})
if(deletedUser.isDeleted) return res.status(400).send({status:false,message:"user is already deleted"})

await userModel.findOneAndUpdate({_id:findData},{$set:{
    isDeleted:true
}})

    return res.status(200).send({status:true,message:"success"})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }

}



module.exports={createUser,getUser,getUserBYId,getAllUser,deleteUser}