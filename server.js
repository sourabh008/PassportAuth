const express = require('express');
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const passportSetup=require("./config/passport-setup");
const mongoose=require("mongoose")
const app = express();
const cookieSession=require("cookie-session")
const keys=require("./config/keys");
const passport=require("passport")
const bodyParser=require("body-parser")
app.use(bodyParser.json());
const path = require("path");
const multer = require("multer");
const User1=require("./models/user");
const fs=require("fs");
const cookieParser = require("cookie-parser");
app.use(cookieParser());


mongoose.connect(
    "mongodb://localhost:27017/kamboj",
    { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true },()=>{
        console.log("connected to db");
    })
    app.use(cookieSession({
        maxAge:24*60*60*1000,
        keys:[keys.session.cookiekey]
    }));
    app.use(passport.initialize());
    app.use(passport.session())
// set view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home',{user:req.user,cookie:req.cookies["jwt"]});
});

app.listen(4000, () => {
    console.log('app now listening for requests on port 4000');
});
//new routes

app.use(bodyParser.urlencoded({ extended: false }))
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploades')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:storage
})
app.post("/postdata",upload.single("file"), async (req,res,next)=>{
    // const img=fs.readFileSync(req.file.path);
    // const encode_img=img.toString("base64");
    // const image={
    //     contentType:req.file.mimetype,
    //     path:req.file.path,
    //     img:new Buffer(encode_img,"base64")
    // }
        const {f_name,l_name,email,password}=req.body;
        User1.findOne({email}).then((response)=>{
            if(response){
                res.send("user already exist")
            }else{
                User1.create({f_name,l_name,email,password}).then((result,err)=>{
                    if(result){
                        res.cookie("jwt", result._id);
                        res.redirect("http://localhost:4000/profile/")
                    }else{
                        res.send("you got some  error")
                    
                    }
                        }).catch((err)=>{
                            res.send(err)
                        })
                    
                    
                    }
        })
    })
    app.post("/profile1",(req,res)=>{

        const email=req.body.email;
        const password=req.body.password;
        User1.findOne({email}).then((result,err)=>{
    if(result) {
        if(result.password==password){
            res.cookie("jwt", result._id);

            // console.log("hi")
            // console.log("loginsuccesfuly",result)
            // res.send("you logged in as" + result.f_name +" "+ result.l_name);
            res.render("profile" ,{user:req.user,cookie:req.cookies["jwt"]})
            // res.redirect("http://localhost:4000/profile")
            // res.render("profile")
    
        }else{
            res.send("wrong password")
        }
      
    }
    else {
    res.send("user not exist")
    }
        }).catch(err=>{
            res.send("user does't exist")
        })
    })