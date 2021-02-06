const router=require("express").Router();
const User1=require("./models/user")
const authcheck=(req,res,next)=>{
    if(!req.user && !req.cookies["jwt"]){
    res.redirect("/auth/login")
    }else{
        next();
    }
}
router.get("/",authcheck,(req,res)=>{
    const cookie=req.cookies["jwt"];
    if(cookie){
    User1.findById({"_id":cookie}).then((resp)=>{
        res.render('profile',{cookie:resp.f_name+resp.l_name,user:null})
    })}
    else{
        res.render('profile', { user: req.user,cookie:null });

    }
    // res.send("you logged in as "+req.user.username)
})
module.exports=router;