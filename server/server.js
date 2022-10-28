const path = require('path');
const express = require('express');
const cors = require('cors');
const keys = require('./keys/index');
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const bodyParser = require('body-parser')
const homeRoutes = require('./routes/home');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

var jsonParser = bodyParser.json()

const app = express();

// const store = new MongoStore({
//   collection: 'sessions',
//   uri: keys.MONGODB_URI
// })

// app.use(session({
//   secret: keys.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   store
// }))

app.use(cors());
app.use(jsonParser);
app.use('/', homeRoutes);
app.use('/api', todoRoutes);
app.use('/auth', authRoutes);

// app.get('/api', (req, res) => {
//     res.json({"name": "123"})
// })

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