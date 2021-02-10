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
      .get(`/api/parcels`)
      .then(response => {
        //console.log(response)
        setParcelsInfo(response.data.parcel)
      })
      .catch(e => console.log(e))
  }

  useEffect(fetchParcels, [])
  

  const confirmParcelArrival = (parcelId) => {
    axios
      .post(`http://localhost:90/${process.env.REACT_APP_WHKEY}/api/parcels/confirmArrival?parcelId=${parcelId}`, { params: {whKey: whKey}})
      .then(response => {
        fetchParcels()
      })
  }

  const columns = [
    {
      title: 'Nadawca',
      dataIndex: 'sender',
      key: 'sender',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Szczegóły',
      dataIndex: 'parcelSettings',
      key: 'sender',
      render: (text, row) => <ParcelSettings parcelId={row._id} status={row.status} confirmParcelArrival={confirmParcelArrival} />,
    },
  ]

  const subColumns = [
    {
      title: 'Produkt',
      dataIndex: 'productId',
      key: 'productId',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Ilość',
      dataIndex: 'quantity',
      key: 'quantity',
      render: text => <a>{text}</a>,
    }
  ]

  return (
    <>
      <Divider orientation="left">Przesyłki w tranzycie</Divider>
      <Table columns={columns} dataSource={parcelsInfo} rowKey={parcelsInfo => parcelsInfo._id}
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
    </>
  )
}

export default Parcels

