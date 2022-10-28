const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const List = require('../models/list');
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator')
const {registerValidators} = require('../utils/validators')

router.post('/login', async (req, res) => {
  const {login, password} = req.body;
  if(login && password) {
    const candidate = User.findOne({email: login || login});
    if(!candidate) {
      return res.status(422).json({"error": "User is not found"});
    }
    // req.session.user = candidate
    // req.session.isAuthenticated = true
    // req.session.save((err) => {
    //   if(err) { 
    //       throw err
    //   }
    // })
  }
});

router.post('/register', registerValidators, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())  {
    return res.status(422).json({"error": errors.array()[0].msg});
  }
  const {email, login, password} = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const list = new List({
    exercises: []
  });
  await list.save();
  const user = new User({
    email: email.normalizeEmail(),
    login,
    password: hashPassword,
    lists: [{
      listId: list.id
    }]
  })
  await user.save();
  return res.status(201).json();
});

module.exports = router;