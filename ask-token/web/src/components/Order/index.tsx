import React from 'react'
import { Card, Col, Row, Table } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function Order () {
  const { AllOrders, CancleOrders, FillOrders } = useSelector(
    (state: RootState) => state.order
  )
  console.log({ AllOrders, CancleOrders, FillOrders })

  const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      render (time: string) {
        return new Date(+time * 1000).toISOString()
      }
    },
    {
      title: 'ASK',
      dataIndex: 'amount',
      render (nu: string) {
        return (window as any)?.web?.web3.utils.fromWei(nu, 'ether')

      }
    },
    {
      title: 'ETH',
      dataIndex: 'exchangeAmount',
         render (nu: string) {
        return (window as any)?.web?.web3.utils.fromWei(nu, 'ether')
      }
    }
  ]

  return (
    <div>
      ;
      <Row>
        <Col span={8}>
          <Card title='已完成交易' bordered={false} style={{ margin: '10px' }}>
            <Table
              rowKey={item=>item.id}
              dataSource={FillOrders}
              columns={columns}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title='我创建的订单'
            bordered={false}
            style={{ margin: '10px' }}
          >
            {/* <Table rowKey={item=>item.id} dataSource={dataSource} columns={columns} /> */}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title='其他人的订单'
            bordered={false}
            style={{ margin: '10px' }}
          >
            {/* <Table rowKey={item=>item.id} dataSource={dataSource} columns={columns} /> */}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
