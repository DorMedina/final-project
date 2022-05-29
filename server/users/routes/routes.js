const validateRegistration = require('../validations/registeration');
const validateLogIn = require('../validations/login');
const { comparePassword, generatePassword } = require('../helpers/bcrypt');
const { generateAuthToken } = require('../helpers/token');

const router = require('express').Router();
const User = require('../models/model');
const _ = require('lodash');
const chalk = require('chalk');

//user register
router.post('/register', async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User already registered');
  }

  user = new User(
    _.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'isAdmin'])
  );

  user.password = generatePassword(user.password);
  await user.save();
  res.send(user);
});

router.post('/login', async (req, res) => {
  const { error } = validateLogIn(req.body);
  if (error) {
    console.log(chalk.redBright.bold(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Invalid Email');
  }

  const validatePassword = comparePassword(req.body.password, user.password);
  if (!validatePassword) {
    return res.status(400).send('Wrong Password');
  }

  res.json({
    firstName: user.firstName,
    token: generateAuthToken(user),
    isAdmin: user.isAdmin,
  });
});

module.exports = router;
