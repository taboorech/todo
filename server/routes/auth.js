const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const List = require('../models/list');
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');
const {validationResult} = require('express-validator')
const {loginValidators, registerValidators} = require('../utils/validators')

router.post('/login', loginValidators, async (req, res) => {
  const errors = validationResult(req);  
  if(!errors.isEmpty()) {
    return res.status(422).json({"error": errors.array()[0].msg});
  }
  res.cookie("sid", req.session.id, {
    maxAge: 31 * 24 * 60 * 60 * 1000,
  });
  //res.locals.isAuth = req.session.isAuthenticated; // ?
  return res.status(200).send(JSON.stringify(req.session.id));
});

router.post('/logout', async (req, res) => {
  console.log(req.session);
  try {
    // Destroy session cookies
    req.session.destroy((err) => {
      res.clearCookie("sid");
      res.clearCookie("connect.sid").status(204).send();
    });
  } catch (e) {
    console.log(e);
  }
})

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