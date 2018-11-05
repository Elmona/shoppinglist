import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import Login from './views/Form/Login'
import Signup from './views/Form/Signup'
import ShoppingList from './views/Shoppinglist'
import Share from './views/Share'
import List from './views/List'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <AuthRoute path='/share/:id' component={Share} />
          <AuthRoute path='/:id' component={ShoppingList} />
          <AuthRoute path='/' component={List} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
