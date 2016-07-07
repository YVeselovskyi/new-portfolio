const express = require('express');
const path = require("path");
const app = express();

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/works', function (req, res) {
  res.send('Test');
});

app.use('/', express.static(__dirname + '/public/assets'));

app.listen(1927, function () {
  console.log('Example app listening on port 3000!');
});
