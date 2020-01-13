import React, { Component } from 'react';
import Main from './Components/Main';
import { Route, Switch } from 'react-router-dom';
import Boards from './data/Boards';
import Lists from './data/Lists';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
        <Switch>
          <Route exact path="/boards" component={Boards} />
          <Route exact path="/boards/:id" component={Lists} />
     
          
        </Switch>
      </div>
    );
  }
}

export default App;
