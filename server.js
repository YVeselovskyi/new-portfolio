'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1927;
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('main/index');
});

app.get('/about', (req, res) => {
    res.render('main/about', { title: 'About' });
});

app.get('/works', (req, res) => {
    res.render('main/works', { title: 'Works' });
});

app.get('/contacts', (req, res) => {
    res.render('main/contacts', { title: 'Contacts' });
});

app.use('/', express.static(__dirname + '/public/assets'));

app.post('/send-email', (req, res) => {
    console.log(req.body);
    request.post('https://api.vk.com/method/messages.send', { 
    	formData: { 
    		user_id: 20099035,
    		message: JSON.stringify(req.body),
    		v: 5,
    		access_token: '894e049b68b77c8ce9d1f6910136a351070a1d601c06df5053aa18b9ac447463194c2599a8d447d66ff8b'
    	} 
    });
    res.end('done');
});

app.use((req, res, next) => {
    res.status(404).render('main/404');
});

app.listen(port, () => {
    console.log("Listening on " + port);
});
