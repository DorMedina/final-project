const validateProduct = require('../validation/newProduct');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyAdminToken,
} = require('../../helpers/authMiddleware');

const router = require('express').Router();
const Product = require('../models/model');
const _ = require('lodash');
const chalk = require('chalk');

//create new product
router.post('/', verifyAdminToken, async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      console.log(chalk.redBright.bold(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    let product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update product
router.put('/:id', verifyAdminToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete product
router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send('product deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

//get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all products
router.get('/', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  console.log(qCategory);
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
