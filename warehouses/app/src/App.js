import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { Menu } from 'antd'
import Header from './components/Header'
import Stock from './components/Stock'
import Parcels from './components/Parcels'

const App = () => {

  return (
    <main>
      <Router>
        <div>
          <Header />

          <hr />

          <Switch>
            <Route exact path="/">
              <Stock />
            </Route>
            <Route path="/parcels">
              <Parcels />
            </Route>
          </Switch>
        </div>
      </Router>
    </main>
  )
}

export default App
