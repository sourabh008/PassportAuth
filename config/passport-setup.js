const passport = require("passport");
const paasport=require("passport");
const keys=require("./keys");
const user1=require("../models/user")
const GoogleStrategy=require("passport-google-oauth20");
const User1 = require("../models/user");
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    User1.findById(id).then((user)=>{
        done(null,user)

    })
})

passport.use(new GoogleStrategy({
    callbackURL:"/auth/google/redirect",
clientID:keys.google.clientID,
clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
    console.log(profile)
User1.findOne({googleId:profile.id}).then((currentuser)=>{
    if(currentuser){
        done(null,currentuser)
    }else{
        new User1({
            username:profile.displayName,
            googleId:profile.id
        }).save().then((userdetails)=>{
            done(null,userdetails)
        });
    }
})


}))