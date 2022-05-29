const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyAdminToken,
} = require('../helpers/authMiddleware');
const router = require('express').Router();
const Favorite = require('./model');
const _ = require('lodash');
const chalk = require('chalk');

router.post('/add', verifyToken, async (req, res) => {
  try {
    const userInfo = req.user;
    let favorite = new Favorite();
    favorite.userID = userInfo._id;
    console.log(req.body);
    favorite.productID = req.body.productID;

    await favorite.save();
    res.send(favorite);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
