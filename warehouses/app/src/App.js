import React from 'react'
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


function App() {
  return (
    <main>
      <Router>
        <div>
          <Menu mode="horizontal">
            <Menu.Item key="stock_link">
              <Link to="/">Stan</Link>
            </Menu.Item>
            <Menu.Item key="parcels_link">
              <Link to="/parcels">Przesyłki</Link>
            </Menu.Item>
          </Menu>

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
