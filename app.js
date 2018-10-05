var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    mongoose            = require('mongoose'),
    seedDB              = require('./models/seed'),
    User                = require('./models/user'),
    passport            = require('passport'),
    LocalStrategy       = require('passport-local'),
    flash               = require('connect-flash');
    
//clean up and reload the examples everytime server started
//seedDB();

//connect to mongoDB
mongoose.connect("mongodb://localhost/bookblog",{ useNewUrlParser: true });

// app config
app.use(methodOverride("_method"));
app.use(express.static(__dirname+"/public"));   // use stylesheet
app.use(bodyParser.urlencoded({extended:true}));// allow bodyparser to encode beyond name-value pairs
app.set('view engine', 'ejs');                  // view engine ejs
app.use(flash());

//passport config
app.use(require('express-session')({
    secret:"The Weather is Fine Today!",
    resave: false,
    saveUnitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// make every template use currentUser
app.use(function(req, res, next){
    res.locals.currentUser = req.user;   //res.locals : available in local template
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// main routes

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

var blogsRoutes = require('./routes/blog'),
    commentRoutes = require('./routes/comment'),
    authenticationRoutes = require('./routes/authentication');

app.use('/blogs',blogsRoutes);
app.use('/blogs/:id/comments', commentRoutes);
app.use('/', authenticationRoutes);


// starts a UNIX socket and listens for connections on the given path
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!");
});

