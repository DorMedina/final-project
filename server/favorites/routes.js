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

router.get('/allfav', verifyToken, async (req, res) => {
  try {
    const favorite = await Favorite.find();
    return res.send(favorite);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.get('/userfav', verifyToken, async (req, res) => {
  try {
    let user = req.user;
    console.log(user._id);

    await Favorite.find({ userID: user._id }).then((favorites) => {
      if (favorites.length === 0) {
        return res.status(404).send('User does not has any favorites');
      }
      return res.json(favorites);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delte favorite
router.delete('/:favid', verifyToken, (req, res) => {
  const userInfo = req.user;
  const FavId = req.params.favid;

  const filter = {
    _id: FavId,
    userID: userInfo._id,
  };

  Favorite.deleteOne(filter)
    .then((x) => {
      if (x.deletedCount == 0) {
        return res.send('No Favorite has deleted');
      }
      res.send(x);
    })
    .catch((x) => res.status(500).json(x));
});

module.exports = router;
