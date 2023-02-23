import React from 'react'
import { Button, Card, Col, Row, Table } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { AnyAaaaRecord } from 'dns'

// type:true 自己的订单，false为别人的订单
function getOrders (orders: any, type: boolean) {
  const { AllOrders, CancleOrders, FillOrders } = orders
  if (!(window as any).web) {
    return []
  }
  const account = (window as any).web.account
  const ortherOrderIds = [...CancleOrders, ...FillOrders].map(order => order.id)
  const todoOrders = AllOrders.filter(
    (order: any) => !ortherOrderIds.includes(order.id)
  )
  console.log(AllOrders, ortherOrderIds, todoOrders)

  if (type) {
    return todoOrders.filter((order: any) => order.user === account)
  } else {
    return todoOrders.filter((order: any) => order.user !== account)
  }
}
export default function Order () {
  const orders = useSelector((state: RootState) => state.order)
  const { AllOrders, CancleOrders, FillOrders } = orders
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

  const myOrderColums = [
    ...columns,
    {
      title: '操作',
      render (order: any) {
        return (
          <Button
            type='primary'
            onClick={() => {
              const { exchange, account } = (window as any).web
              exchange.methods.cancleOrder(order.id).send({ from: account })
            }}
          >
            取消
          </Button>
        )
      }
    }
  ]
  const otherOrderColums = [
    ...columns,
    {
      title: '操作',
      render (order: any) {
        return (
          <Button
            danger
            onClick={() => {
              const { exchange, account } = (window as any).web
              exchange.methods.fillOrder(order.id).send({ from: account })
            }}
          >
            购买
          </Button>
        )
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
              rowKey={item => item.id}
              dataSource={FillOrders}
              columns={columns}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title='交易中-我创建的订单'
            bordered={false}
            style={{ margin: '10px' }}
          >
            <Table
              rowKey={item => item.id}
              dataSource={getOrders(orders, true)}
              columns={myOrderColums}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title='交易中-其他人的订单'
            bordered={false}
            style={{ margin: '10px' }}
          >
            <Table
              rowKey={item => item.id}
              dataSource={getOrders(orders, false)}
              columns={otherOrderColums}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
