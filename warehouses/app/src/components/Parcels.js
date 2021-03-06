import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Divider, Table, Form, Input, InputNumber, Space, List } from 'antd'

const ParcelSettings = ({ parcelId, status, confirmParcelArrival }) => {

  if (status == "in_shipping") {
    return (
      <>
        <Button onClick={() => confirmParcelArrival(parcelId)} >Potwierdź otrzymanie</Button>
      </>
    )
  }
  else {
    return (
      <>
        Dostarczono
      </>
    )
  }


}

const Parcels = () => {

  const [parcelsInfo, setParcelsInfo] = useState(localStorage.getItem('whKey'))
  const [whKey, setWhKey] = useState(localStorage.getItem('whKey'))

  // const [formProductId, setFormProductId] = useState(null)
  // const [formAvailableQuantity, setFormAvailableQuantity] = useState(null)

  const fetchParcels = () => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_WHKEY}/api/parcels/`)
      .then(response => {
        console.log("Parcels", response.data.parcel)
        setParcelsInfo(response.data.parcel)
      })
      .catch(e => console.log(e))
  }

  useEffect(fetchParcels, [])
  

  const confirmParcelArrival = (parcelId) => {
    axios
      .post(`http://localhost:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_WHKEY}/api/parcels/confirmArrival?parcelId=${parcelId}`, { params: {whKey: whKey}})
      .then(response => {
        fetchParcels()
      })
  }

  const columns = [
    {
      title: 'Nadawca',
      dataIndex: 'sender',
      key: 'sender',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Identyfikator',
      dataIndex: '_id',
      key: '_id',
      render: text => <p>{text}</p>,
    }
    //,
    // {
    //   title: 'Szczegóły',
    //   dataIndex: 'parcelSettings',
    //   key: 'sender',
    //   render: (text, row) => <ParcelSettings parcelId={row._id} status={row.status} confirmParcelArrival={confirmParcelArrival} />,
    // },
  ]

  const subColumns = [
    {
      title: 'Produkt',
      dataIndex: 'productId',
      key: 'productId',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Ilość',
      dataIndex: 'quantity',
      key: 'quantity',
      render: text => <p>{text}</p>,
    }
  ]

  const dataSource1 = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns1 = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <Divider orientation="left">Przesyłki w tranzycie</Divider>
      {/* {parcelsInfo.length > 0 ? <Table columns={columns} dataSource={parcelsInfo} rowKey={parcelsInfo => parcelsInfo._id}

      />
      : ""} */}

      <Table dataSource={parcelsInfo} columns={columns} />;

      {/* {parcelsInfo.length > 0 ? <Table columns={columns} dataSource={parcelsInfo} rowKey={parcelsInfo => parcelsInfo._id}
        expandable={{
          expandedRowRender: products => {
            return <Table
              size="small"
              columns={subColumns}
              dataSource={products.products}
              pagination="none"
            />
          }
        }}
      />
      : ""} */}
            {/* {parcelsInfo.length > 0 ? <Table columns={columns} dataSource={parcelsInfo} rowKey={parcelsInfo => parcelsInfo._id}
        expandable={{
          expandedRowRender: products => {
            return <Table
              size="small"
              columns={subColumns}
              dataSource={products.products}
              pagination="none"
            />
          }
        }}
      />
      : ""} */}
      
    </>
  )
}

export default Parcels

