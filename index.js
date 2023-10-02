const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session); //Because it will store session info. Hence, passing session in args
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');


const app = express();
app.use(sassMiddleware({
   src: './assets/scss',  //from where style sheets needs to be picked
   dest: './assets/css',
   debug: true, //if scss file not get compiled, we want to debug that easily
   outputStyle: 'expanded', //we want output in multiple lines so that we can debug easily
   prefix: '/css' //inside assets folder look out for css folder
}));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//make uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);


//Extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store our session cookie in the db
app.use(session({
    name: 'codial', //name of the cookie
    //ToDo change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: (1000 * 60 * 100) //After 100 minutes, this session cookie should expire!
    },
    store: new MongoStore(
     {
       mongooseConnection: db,
       autoRemove: 'disbaled'
     },
     function (err) {
      console.log(err || 'connect mongo-db setup ok')
     }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticationUser);

app.use(flash());
app.use(customMWare.setFlash);

//Use express router
app.use('/', require('./routes/index')); //We can simply state ./routes too that would automatically mean ./routes/index


app.listen(port, function(err){
   if (err) {
      console.log(`Error in running the server: ${err}`);
   }
   console.log(`Server is up and running at port: ${port}`);
});
