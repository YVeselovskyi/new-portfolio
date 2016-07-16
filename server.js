'use strict';
const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 1927;
const ejs = require('ejs');
const ejsMate = require('ejs-mate');



app.engine('ejs' , ejsMate);
app.set('view engine', 'ejs');

app.get('/' , (req, res) => {
  res.render('main/index');
});

app.get('/about' , (req, res) => {
  res.render('main/about', {title: 'About'});
});

app.get('/works' , (req, res) => {
  res.render('main/works', {title: 'Works'});
});

app.get('/contacts' , (req, res) => {
  res.render('main/contacts', {title: 'Contacts'});
});



app.use('/', express.static(__dirname + '/public/assets'));

app.use( (req, res, next) => {
  res.status(404).render('main/404');
});

app.listen(port, function() {
  console.log("Listening on " + port);
});
