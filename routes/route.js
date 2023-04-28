const router=require("express").Router()

const {createUser,getUser,getUserBYId,getAllUser,deleteUser}=require("../controllers/userController")
const {authentication,authorization}=require("../midilware/auth.js")

router.post("/createUser",createUser)
router.get("/getUser",authentication,getUser)
router.get("/getUserById",authentication,authorization,getUserBYId)
router.get("/getAllUser",authentication,getAllUser)
router.delete("/deleteUser",authentication,authorization,deleteUser)


module.exports=router