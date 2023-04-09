require('dotenv').config();
var md5 = require('md5');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'trash is my secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1 heure en millisecondes
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.get('/', (req, res) => {
  
    res.render('home');
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});