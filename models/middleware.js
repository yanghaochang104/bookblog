var Blog = require('./blog'),
    Comment = require('./comment'),
    flash = require('connect-flash');
    
var middlewareObject = {

    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            req.flash("error","please login for posting new blogs or comments !");
            res.redirect("/login");
        }
    },
    
    checkBlogOwnership: function(req, res, next){
        if(req.isAuthenticated){
            Blog.findById(req.params.id, function(err, foundBlog){
                if(err){
                    res.redirect("back");
                } else {
                    if(foundBlog.author.id.equals(req.user._id)){
                        return next();
                    } else {
                        res.redirect("back");
                    }
                }
            });
        } else {
            res.redirect("back");
        }
    },
    
    checkCommentOwnership: function(req, res, next){
        if(req.isAuthenticated){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    res.redirect("back");
                } else {
                    if(foundComment.author.id.equals(req.user._id)){
                        return next();
                    } else {
                        res.redirect("back");
                    }
                }
            });
        } else {
            res.redirect("back");
        }
    }
};

module.exports = middlewareObject;