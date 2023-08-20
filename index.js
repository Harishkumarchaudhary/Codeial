const express = require('express');
const port = 8000;

const app = express();

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
