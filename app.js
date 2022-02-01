
const express = require("express");
const ejs = require('ejs');

const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded());
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser:true})
const userSchema = {
  email:String,
  password:String
}

const User = new mongoose.model('User',userSchema)

app.get('/',(req,res)=>{
  res.render('home')
})

app.get('/login',(req,res)=>{
  res.render('login')
})

app.get('/register',(req,res)=>{
  res.render('register')
})

app.post('/register',(req,res)=>{
  const newUser = new User({
    email:req.body.username,
    password:req.body.password
  })
  newUser.save(err=>{
    if(err){
      console.log(err);
      res.status(500).json({
        msg:'some error while registering new user'
      })
    }
    else{
      res.render('secrets')
    }
  })
})
app.use('/',(req,res)=>{
  res.render('404')
})


const port = process.env.PORT || 4000;

app.listen(port,()=>{
  console.log('secrets app server running on port ',port);
})