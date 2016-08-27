'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1927;
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const nodemailer = require('nodemailer');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

app.post('/send-email' , (req, res) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport('smtps://yaroslavveselovskyi@gmail.com:19dynamokyiv94@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
    to: 'yaroslavveselovskyi@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: req.body.message, // plaintext body
    html: req.body.message // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

  res.end('done');
});

app.use( (req, res, next) => {
  res.status(404).render('main/404');
});

app.listen(port, () => {
  console.log("Listening on " + port);
});
