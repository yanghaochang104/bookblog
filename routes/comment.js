var express = require('express'),
    router = express.Router({ mergeParams:true}),
    Blog = require('../models/blog'),
    Comment = require('../models/comment'),
    middlewareObject = require('../models/middleware');
    

router.get("/new", middlewareObject.isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {blog:foundBlog, currentUser:req.user});
        }
    });

});

router.post("/", middlewareObject.isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundBlog.comments.push(comment);
                    foundBlog.save();
                    req.flash("success", "Comment posted!");
                    res.redirect("/blogs/"+foundBlog._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middlewareObject.checkCommentOwnership,function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           Comment.findById(req.params.comment_id, function(err, foundComment){
               if(err){
                   console.log(err);
                   res.redirect("back");
               } else {
                    res.render("comments/edit", {blog:foundBlog, comment:foundComment});
               }
           });
       }
    });
});

router.put("/:comment_id", middlewareObject.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated!");
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

router.delete("/:comment_id", middlewareObject.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/blogs/"+req.params.id);
        }
    });
});




module.exports = router;