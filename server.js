const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine' , 'hbs');
app.use(express.static(__dirname+'/public'));

//express middleware kullanımı( express in yetkin
// olmadığı seyleri express e yaptırmak için kullanılır)
app.use((req,res,next) =>{
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

app.use((req,res,next) =>{
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Welcome to our site route',
    welcomeMessage : 'Welcome message'
  });
// res.send('Hello Express');
// res.send({
//   name : 'Erdem',
//   surname : 'ŞEN',
//   hobies : ['Leather stitching','reading','hiking']
// });
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
  pageTitle : 'Erdem Page'
});
});

app.get('/bad',(req,res)=>{
res.send({
  errorMessage : 'Thing gone bad'
});
});


app.listen(port);
