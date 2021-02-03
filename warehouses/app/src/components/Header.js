import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu } from 'antd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

const Header = () => {

  const [whName, setWhName] = useState(null)
  
  const getWhName = () => {
    console.log("Resolving WH name")
    axios
    .get(`http://localhost:90/api`)
    .then(response => {
      console.log("RESOLVED", response)
      setWhName(response.data.name)
    })
  }

  useEffect(getWhName, [])



  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="wh_name">
          {whName}
        </Menu.Item>
        <Menu.Item key="stock_link">
          <Link to="/">Stan</Link>
        </Menu.Item>
        <Menu.Item key="parcels_link">
          <Link to="/parcels">Przesyłki</Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default Header


