var express                 = require('express');
var mongoose                = require('mongoose');
var passport                = require('passport');
var bodyParser              = require('body-parser');
var LocalStrategy           = require('passport-local');
var passportLocalMongoose   = require('passport-local-mongoose');

var User                    = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo_app');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===============================
app.get('/register',(req, res)=>{
    res.render('register');
});
app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/secret', (req, res)=>{
    res.render('secret');
});

app.post('/register', (req, res)=>{
    res.send('REGISTER POST ROUTE');
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        };
        passport.authenticate('local')(req, res, ()=>{
            res.redirect('/secret');
        });
    });
});

//notice the inline require
app.use(require('express-session')({
    secret: "I love Susana",
    resave: false,
    saveUninitialized: false
}));

app.listen(8000,()=>{
    console.log('server started on port 8000');
    
});
