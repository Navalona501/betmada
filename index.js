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

let todayTips = [
  {
    match: 'Mathare Utd. vs Tusker',
    tip: '1',
    result: 'Pending'
  },
  {
    match: 'Admira Prague vs Povltavska FA',
    tip: '1',
    result: 'Pending'
  },
  {
    match: 'Bystrice n. Pern. vs Tasovice',
    tip: '2',
    result: 'Pending'
  },
  {
    match: 'Chomutov vs Slany',
    tip: '2',
    result: 'Pending'
  },
  {
    match: 'AC Milan vs Napoli',
    tip: 'DCX2',
    result: 'Pending'
  },
  {
    match: 'Ghazl El Mahallah vs Future FC',
    tip: '2',
    result: 'Pending'
  },
  {
    match: 'Cosmos vs Cailungo',
    tip: '1',
    result: 'Pending'
  },
  {
    match: 'Tre Fiori vs Juvenes/Dogana',
    tip: '2',
    result: 'Pending'
  }
];

let yesterdayTips = [
  {
    match: 'Millwall U21 vs Swansea U21',
    tip: 'OV25',
    result: 'Pending'
  },
  {
    match: 'Bristol City U21 vs Ipswich U21',
    tip: 'OV25',
    result: 'Pending'
  },
  {
    match: 'Young Lions vs DPMM',
    tip: 'OV25',
    result: 'Pending'
  },
  {
    match: 'Peterborough U21 vs Barnsley U21',
    tip: '2OV25',
    result: 'Pending'
  },
  {
    match: 'Kinondoni MC vs Geita Gold',
    tip: 'UN25',
    result: 'Pending'
  },
  {
    match: 'CSKA 1948 Sofia II vs Svoge',
    tip: '1',
    result: 'Pending'
  },
  {
    match: 'BFC Daugavpils vs Valmiera',
    tip: '2',
    result: 'Pending'
  },
  {
    match: 'Cotonsport vs Colombe',
    tip: 'UN25',
    result: 'Pending'
  },
  {
    match: 'Magra vs MC Alger',
    tip: 'UN25',
    result: 'Pending'
  },
  {
    match: 'Kuressaare vs Flora',
    tip: '2',
    result: 'Pending'
  },
  {
    match: 'Silkeborg vs Horsens',
    tip: 'OV25',
    result: 'Pending'
  },
  {
    match: 'TB Berlin vs Lokomotive Leipzig',
    tip: 'OV25',
    result: 'Pending'
  },
  {
    match: 'Barracas Central vs Platense',
    tip: 'UN25',
    result: 'Pending'
  },
  {
    match: 'L.R. Vicenza vs Juventus U23',
    tip: 'DNB1',
    result: 'Pending'
  },
  {
    match: 'Peterhead vs Dunfermline',
    tip: '2',
    result: 'Pending'
  },
  {
    match: 'Manchester City vs Bayern Munich',
    tip: 'OV25',
    result: 'Pending'
  },
  {
    match: 'Benfica vs Inter',
    tip: 'DNB1',
    result: 'Pending'
  },
];

app.get('/', (req, res) => {
  
    res.render('home', {
      todayTipsp: todayTips,
      yesterdayTipsp: yesterdayTips
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});