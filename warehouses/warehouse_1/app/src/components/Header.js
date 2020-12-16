import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'

const Header = () => {



  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="wh_name">
          Magazyn 1
        </Menu.Item>
        <Menu.Item key="stock">
          <a href="./Stock.js">Stan magazynowy</a>
        </Menu.Item>
        <Menu.Item key="app" >
          <a href="./Parcels.js">Przesyłki</a>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default Header


