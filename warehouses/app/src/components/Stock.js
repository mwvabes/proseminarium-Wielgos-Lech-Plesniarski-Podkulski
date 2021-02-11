import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Divider, Table, Form, Input, InputNumber, Select, Space } from 'antd'

const { Option } = Select

const InputQuantity = ({ productId, updateStock, products }) => {

  const defaultValue = 1

  const [availableQuantity, setAvailableQuantity] = useState(defaultValue)

  const handleAvailableQuantityChange = (value) => {
    setAvailableQuantity(value)
  }

  return (
    <Form layout="inline">
      <Space>
        <InputNumber addonAfter="szt." value={availableQuantity} onChange={handleAvailableQuantityChange} min={1}></InputNumber>
        <Button shape="round" onClick={() => updateStock(productId, availableQuantity)}>Dodaj</Button>
      </Space>
    </Form>
  )
}

const Stock = () => {

  const [stockInfo, setStockInfo] = useState([])
  const [whKey, setWhKey] = useState(localStorage.getItem('whKey'))

  const [fetchedProducts, setFetchedProducts] = useState([])
  const [optionsProducts, setOptionsProducts] = useState([])

  const [formProduct, setFormProduct] = useState(null)
  const [formAvailableQuantity, setFormAvailableQuantity] = useState(null)

  const fetchStock = () => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_WHKEY}/api/stock`)
      .then(response => {
        setStockInfo(response.data.stock)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const fetchProducts = () => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_PORT}/products/api/produkty`)
      .then(response => {
        setFetchedProducts(response.data)
        setOptionsProducts(response.data.map(p => <Option value={p.id} >{`${p.ean} ${p.nazwa}`}</Option> ))
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(fetchProducts, [])

  const fetchWhKey = () => {
    setWhKey(localStorage.getItem('whKey'))
  }

  useEffect(fetchWhKey, [])

  useEffect(fetchStock, [])
  
  

  const handleProductChange = (event) => {
    console.log("e", event)
    setFormProduct(fetchedProducts[event-1])
  }

  const handleAvailableQuantityChange = (event) => {
    setFormAvailableQuantity(event.target.value)
  }

  const updateStock = (productId, availableQuantity) => {
    axios
      .post(`http://localhost:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_WHKEY}/api/stock/updateStock?productId=${productId}&availableQuantity=${availableQuantity}`)
      .then(response => {
        fetchStock()
      })
  }

  const setStock = () => {
    axios
      .post(`http://localhost:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_WHKEY}/api/stock/setStock?productId=${formProduct.id}&availableQuantity=${formAvailableQuantity}`)
      .then(response => {
        fetchStock()
      })
  }

  const removeAllStock = () => {
    axios
      .delete(`http://localhost:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_WHKEY}/api/stock/deleteAll`)
      .then(response => {
        setStockInfo([])
      })
  }

  const retrieveProductName = (id) => {
    const p = fetchedProducts.find(p => {return p.id == id})
    if (p) {
      return p.nazwa
    } else {
      return ""
    }

  }

  const columns = [
    {
      title: 'Produkt',
      dataIndex: 'productId',
      key: 'productId',
      render: text => <a>{text}</a>,
      render: text => <p>{retrieveProductName(text)}</p>,
    },
    {
      title: 'Dostępna ilość',
      key: 'availableQuantity',
      dataIndex: 'availableQuantity',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Dodaj ilość',
      key: 'addQuantityInput',
      dataIndex: 'productId',
      render: productId => <InputQuantity productId={productId} updateStock={updateStock} />,
    }
  ];

  return (
    <>

      <Form
        layout={"inline"}
      // form={form}
      // initialValues={{ layout: formLayout }}
      // onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Produkt: ">
          {/* <Input placeholder="1" onChange={handleProductIdChange} /> */}
        
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Wybór produktu"
          optionFilterProp="children"
          onChange={(e) => handleProductChange(e)}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          // filterOption={(input, option) =>
          //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
        >
          {
            optionsProducts.length > 0 ? optionsProducts : ""
          }
        </Select>

        </Form.Item>
        <Form.Item label="Ilość (szt.)">
          <Input placeholder="4" onChange={handleAvailableQuantityChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={setStock}>Zapisz</Button>
        </Form.Item>
      </Form>
      <Divider />
      <Button danger type="primary" onClick={() => removeAllStock()}>Usuń wszystko</Button>
      <Divider orientation="left">Aktualny stan magazynowy</Divider>
      <Table columns={columns} dataSource={stockInfo} rowKey={stockInfo => stockInfo._id} />
    </>
  )
}

export default Stock

