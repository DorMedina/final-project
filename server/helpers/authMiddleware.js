const { checkToken } = require('../users/helpers/token');

const verifyToken = (req, res, next) => {
  //get user token from the request
  const userToken = req.header('token');
  //check if the user send token
  if (!userToken) {
    return res.status(401).send('Please send token');
  }

  //get user data by token
  const userData = checkToken(userToken);
  //if the token is invalid we'll get an error
  if (!userData) {
    return res.status(401).send('Invalid Token cannot get user data');
  }
  req.user = userData;

  next();
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send('You are not alowed to do that');
    }
  });
};

const verifyAdminToken = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send('You are not alowed to do that');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyAdminToken,
};
