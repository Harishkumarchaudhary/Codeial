const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(express.static('./assets'));

app.use(expressLayouts);

//Use express router
app.use('/', require('./routes/index')); //We can simply state ./routes too that would automatically mean ./routes/index

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
   if (err) {
      console.log(`Error in running the server: ${err}`);
   }
   console.log(`Server is up and running at port: ${port}`);
});
