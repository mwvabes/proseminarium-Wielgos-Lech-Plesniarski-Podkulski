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
    axios
    .get(`http://localhost:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_WHKEY}/api`)
    .then(response => {      
      setWhName(response.data.name)
      localStorage.setItem('whKey', response.data.whKey);
    })
  }

  useEffect(getWhName, [])



  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="wh_name">
          {whName}
        </Menu.Item>
        {/* <Menu.Item key="stock_link">
          <Link to="/">Stan</Link>
        </Menu.Item>
        <Menu.Item key="parcels_link">
          <Link to="./parcels">Przesyłki przychodzące</Link>
        </Menu.Item>
        <Menu.Item key="myparcels_link">
          <Link to="./myparcels">Przesyłki wychodzące</Link>
        </Menu.Item> */}
      </Menu>
    </>
  )
}

export default Header


