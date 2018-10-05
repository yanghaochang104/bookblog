var express = require('express'),
    router = express.Router({mergeParams:true}),
    Blog = require('../models/blog'),
    middlewareObject = require('../models/middleware');

// Index Route - show index page
router.get("/", function(req, res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        } else {
            res.render("./blogs/index", {blogs:blogs, currentUser:req.user}); 
            // show index page, pass found blogs into index as 'blogs' parameter 
        }
    });
});

//New Route - enter the form for creating new blogs
router.get("/new", middlewareObject.isLoggedIn, function(req, res){
    res.render("blogs/new",{currentUser:req.user}); // show the 'new' page
});

//Create Route - receive data from 'new' form and create a blog in mongoDB
router.post("/", function(req, res){
    //req.body.blog - where data from 'new' form stored in 
    var title = req.body.blog.title,
        image = req.body.blog.image,
        content = req.body.blog.content,
        author = {
            id:req.user._id,
            username:req.user.username
        },
        newBlog = {title:title, image:image, content:content, author: author};
    Blog.create(newBlog, function(err,newblog){
       if(err){
           console.log(err);
           res.render("blogs/new",{currentUser:req.user});
       } else {
            //back to index page     

            res.redirect("/blogs");
       }
   });
});

//Show Route - page for showing specific blog
router.get("/:id", function(req, res){
    // find specific blog in mongoDB by id, and call it as 'foundBlog'
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            // if err => back to index page
            console.log(err);
            res.redirect("/blogs");
        } else {
            // if success => enter 'show' page and pass foundBlog as 'blog' parameter
            res.render("blogs/show", {blog:foundBlog,currentUser:req.user});
        }
    });
});

//Edit Route - page for editting content of specific blog
router.get("/:id/edit", middlewareObject.checkBlogOwnership, function(req, res){
    // find specific blog in mongoDB by id, and call it as 'foundBlog'
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            // if err => back to the page that shows the specific blog
            console.log(err);
        } else {
            // if success => enter 'edit' page and pass foundBlog as 'blog' parameter
            res.render("blogs/edit", {blog: foundBlog, currentUser:req.user});
        }
    });
});

//Update Route - receive data from 'edit' page and update the content of the blog
router.put("/:id", middlewareObject.checkBlogOwnership, function(req, res){
    // find blog by 'req.params.id',  and pass 'req.body.blog' as updated content, at last
    // called the updated blog as 'updatedBlog'
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
            // if err => back to edit page
            res.redirect("/blogs/"+ req.params.id+"/edit");
        } else {
            // if success => redirect to 'show' page of specific blog
            res.redirect("/blogs/"+updatedBlog._id);
        }
    });
});

//Delete Route - delete specific blog
router.delete("/:id", middlewareObject.checkBlogOwnership, function(req, res){
    // find blog by 'req.params.id' and remove it
    Blog.findByIdAndDelete(req.params.id, function(err){
        if(err){
        // if err => back to 'show' page
            console.log(err);
            res.redirect("/blogs"+req.params.id);
        } else {
        // if success => show 'index' page
        res.redirect("/blogs");
        }
    }); 
});

module.exports = router;