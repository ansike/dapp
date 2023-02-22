import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Card, Col, Row, Statistic } from 'antd'

export default function Balance () {
  const balance = useSelector((state: RootState) => state.balance)
  function convert (money: string) {
    if (!(window as any).web) return '0'
    return (window as any).web.web3.utils.fromWei(money, 'ether')
  }
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='钱包中以太币：'
              value={convert(balance.EtherWallet)}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='钱包中ASK：'
              value={convert(balance.TokenWallet)}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='交易所中以太币：'
              value={convert(balance.EtherExchange)}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='交易所中ASK：'
              value={convert(balance.TokenExchange)}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
