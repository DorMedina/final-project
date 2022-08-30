import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Boots';
import SingleProduct from './pages/SingleProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites.jsx';
import AuthGuardRoute from './components/AuthGuardRoute';
import Success from './pages/Success';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart" component={Cart} />
        <Route path="/home" component={Home} />
        <Route path="/boots" component={Category} />
        <Route path="/clothing" component={Category} />
        <Route path="/equipment" component={Category} />
        <Route path="/footballs" component={Category} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/success" component={Success} />
        <AuthGuardRoute path="/favorites" component={Favorites} />
      </Switch>
    </Router>
  );
};

export default App;
