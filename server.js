const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 1927;

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/works', function (req, res) {
  res.send('Test');
});

app.use('/', express.static(__dirname + '/public/assets'));


app.listen(port, function() {
  console.log("Listening on " + port);
});
