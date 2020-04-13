import React, {Component} from 'react'
//import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing2'
import Cities from './components/Cities'
import Itineraries from './components/Itinerary'
import Login from './components/Login'
import SignIn from './components/SignPage'

export default class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/cities' component={Cities} />
              <Route path='/itineraries' component={Itineraries} />
              <Route path='/login' component={Login} />
              <Route path='/signin' component={SignIn} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
  }
