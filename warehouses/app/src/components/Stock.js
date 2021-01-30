import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Divider, Table, Form, Input, InputNumber, Space } from 'antd'

const InputQuantity = ({ productId, updateStock }) => {

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

  const [formProductId, setFormProductId] = useState(null)
  const [formAvailableQuantity, setFormAvailableQuantity] = useState(null)

  const fetchStock = () => {
    axios
      .get(`http://localhost:90/api/stock`)
      .then(response => {
        console.log(response)
        setStockInfo(response.data.stock)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(fetchStock, [])

  const handleProductIdChange = (event) => {
    setFormProductId(event.target.value)
  }

  const handleAvailableQuantityChange = (event) => {
    setFormAvailableQuantity(event.target.value)
  }

  const updateStock = (productId, availableQuantity) => {
    axios
      .post(`http://localhost:90/api/stock/updateStock?productId=${productId}&availableQuantity=${availableQuantity}`)
      .then(response => {
        fetchStock()
      })
  }

  const setStock = () => {
    axios
      .post(`http://localhost:90/api/stock/setStock?productId=${formProductId}&availableQuantity=${formAvailableQuantity}`)
      .then(response => {
        fetchStock()
      })
  }

  const removeAllStock = () => {
    axios
      .delete(`http://localhost:90/api/stock/deleteAll`)
      .then(response => {
        setStockInfo([])
      })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'productId',
      key: 'productId',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Dostępna ilość',
      key: 'availableQuantity',
      dataIndex: 'availableQuantity',
      render: text => <a>{text}</a>,
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
        <Form.Item label="ID produktu">
          <Input placeholder="1" onChange={handleProductIdChange} />
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

