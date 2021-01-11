import React, { useState, useEffect } from 'react'
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
    setWhName(process.env.REACT_APP_WH_NAME)
    console.log(process.env)
    console.log(window)
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


