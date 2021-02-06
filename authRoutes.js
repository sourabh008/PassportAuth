const router = require('express').Router();
const passport=require("passport")
// auth login
router.get('/login', (req, res) => {
    res.render('login',{user:req.user,cookie:req.cookies["jwt"]});

});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logOut();
    res.clearCookie("jwt");

    res.redirect("/")
});
router.get('/signup', (req, res) => {
    // handle with passport
res.render('signup',{user:req.user,cookie:req.cookies["jwt"]})
});

// auth with google+
router.get('/google', passport.authenticate("google",{
    scope:['profile','email']
})
);
router.get('/google/redirect', passport.authenticate("google"),(req, res) => {
    res.redirect("/profile/")
    // res.send('you reached the redirect URI');
});
router.get('/linkedin', passport.authenticate("google")
);
router.get('/linkedin/redirect', passport.authenticate("google"),(req, res) => {
    res.redirect("/profile/")
    // res.send('you reached the redirect URI');
});
module.exports = router;