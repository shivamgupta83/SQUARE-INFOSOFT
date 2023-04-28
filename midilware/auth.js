let jwt= require("jsonwebtoken")

const authentication= (req,res,next)=>{

let token= req.header("accesstoken")
if(!token) return res.status(400).send({status:false,message:"Access Token is not present"})

jwt.verify(token,"key",(err,data)=>{
    if(err) return res.status(401).send({status:false,message:"token is not valid"})
    else{
        req.userData=data
        next();
    }
})
}


const authorization= (req,res,next)=>{

let queryId= req.query.user_id;
let originalUserId=req.userData._id
if(queryId!=originalUserId) return res.status(403).send({status:false,message:"you are not authorize persion"})

next()

}

module.exports={authentication,authorization}