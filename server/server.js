const path = require('path');
const express = require('express');
const cors = require('cors');
const keys = require('./keys/index');
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const userMiddleware = require('./middleware/user');
const homeRoutes = require('./routes/home');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

var jsonParser = bodyParser.json()

const app = express();

app.use(jsonParser);
app.use(cookieParser());

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI
})

app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  expires: 1000 * 60 * 60 * 24 * 30,
  saveUninitialized: false,
  store,
  cookie: {
    path: '/',
    //domain:  utils.isDevelopmentEnv() ? null : '.' + config.get('domain').replace('http://', '').replace('https://', ''),
    httpOnly: true
  }
}))

app.use(cors({
  origin: ["http://localhost:3000", "https://localhost:3000"],
  credentials: true,
}));

app.use(userMiddleware);

app.use('/', homeRoutes);
app.use('/api', todoRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;

async function start() {
  try {        
    await mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true})
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch(e) {
    console.log(e)
  }
}

start();