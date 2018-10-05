var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport');
    
//register page for sign in
router.get("/register", function(req,res){
   res.render("authentication/register"); 
});

// get data from register form and create new user in mongoDB, redirect to index when succeed
router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("authentication/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/blogs');
        });
    });
});

//login page for login
router.get("/login", function(req, res){
    res.render("authentication/login");
});

//get data from login form and compair if the account matches the one in mongoDB
router.post("/login", passport.authenticate("local", {
    successRedirect:"/blogs",
    failureRedirect:"/login"
}),function(req, res){
    res.render("authentication/login");
});

//logout Route
router.get("/logout", function(req, res){
   req.logout(); 
   req.flash("success", "logout!");
   res.redirect("/blogs");
});

module.exports = router;