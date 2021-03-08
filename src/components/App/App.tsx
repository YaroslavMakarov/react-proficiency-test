import { Route, Switch } from 'react-router-dom';

import Characters from '../Characters/Characters';
import Episodes from '../Episodes/Episodes';
import HomePage from '../HomePage/HomePage';
import Locations from '../Locations/Locations';

import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route 
          path='/'
          exact
          component={HomePage}
        />
        <Route 
          path='/characters'
          exact
          component={Characters}
        />
        <Route 
          path='/episodes'
          exact
          component={Episodes}
        />
        <Route 
          path='/locations'
          exact
          component={Locations}
        />
      </Switch> 
    </div>
  );
}

export default App;
