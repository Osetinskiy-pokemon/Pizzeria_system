import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import Basket from './components/Basket';
import Profile from './components/Profile';
import Stat from './components/Stat';
import Products from './components/Products';
import Orders from './components/Orders';
import About from './components/About';

const App = () => {

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/basket' component={Basket} />
          <Route path='/profile' component={Profile} />
          <Route path='/products' component={Products} />
          <Route path='/orders' component={Orders} />
          <Route path='/stat' component={Stat} />
          <Route path='/about' component={About} />
          <Route path='*' component={Menu} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
