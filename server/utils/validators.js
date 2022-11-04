const {body} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.loginValidators = [
  body('password').notEmpty(),
  body('login').custom(async (value, {req}) => {
    try {
      const {password} = req.body;
      const candidate = await User.findOne({email: value});
      if(!candidate) {
        return Promise.reject("User is not found");
      }
      const areSame = await bcrypt.compare(password, candidate.password);
      if(!areSame) {
        return Promise.reject("Password do not match");
      }
      req.session.user = {id: candidate._id, login: candidate.login};
      req.session.isAuthenticated = true;
      req.session.cookie.maxAge = 31 * 24 * 60 * 60 * 1000;
      req.session.save((err) => {
        if(err) { 
          throw err;
        }
      })
      // Promise.resolve({id: candidate._id, login: candidate.login});
    } catch(e) {
      console.log(e);
    }
  })
]

exports.registerValidators = [
  body('email')
  .isEmail()
  .custom(async (value, {req}) => {
    try {
      const candidate = await User.findOne({email: value});
      if(candidate) {
        return Promise.reject('The email already exists');
      }
    } catch(e) {
      console.log(e);
    }
  }).normalizeEmail(),
  body('password')
  .isLength({min: 6, max: 56}).withMessage("Password must contain from 6 to 56 symbols")
  .isAlphanumeric()
  .trim(),
  body('confirmPassword').custom((value, {req}) => {
    if(value !== req.body.password) {
      throw new Error('Passwords must match');
    }
    return true;
  }).trim(),
  body('login', 'Login must contain more than 2 characters')
  .isLength({min: 2})
  .trim()
]