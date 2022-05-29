require('./helpers/connectToDb');

const express = require('express');
const app = express();

const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./users/routes/routes');
const productsRouter = require('./products/routes/routes');
const favoritesRouter = require('./favorites/route');

app.use(morgan(chalk.cyan(':method :url :status :response-time ms')));
app.use(cors());
app.use(express.json());
app.use('/shopapi/users', userRouter);
app.use('/shopapi/products', productsRouter);
app.use('/shopapi/favorites', favoritesRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(
    chalk.blueBright.bold(`server run on: http://:localhost:${PORT}`)
  );
});
