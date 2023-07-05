import { useEffect, useState } from 'react'
import socketIo from 'socket.io-client'
import { Order } from '../../types/Order'
import { OrdersBoard } from '../OrdersBoard'
import { Container } from './styles'
import { api } from '../../utils/api'

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId))
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order,
      ),
    )
  }

  useEffect(() => {
    const socket = socketIo('http://192.168.0.236:3002', {
      transports: ['websocket'],
    })

    socket.on('orders@new', (order) => {
      setOrders((prevState) => prevState.concat(order))
    })
  }, [])

  useEffect(() => {
    api.get('/orders').then(({ data }) => {
      setOrders(data)
    })
  }, [])

  const waiting = orders.filter((order) => order.status === 'WAITING')
  const inProduction = orders.filter(
    (order) => order.status === 'IN_PRODUCTION',
  )
  const done = orders.filter((order) => order.status === 'DONE')

  return (
    <Container>
      <OrdersBoard
        orders={waiting}
        icon="🕐"
        title="Fila de espera"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        orders={inProduction}
        icon="🧑🏼‍🍳"
        title="Em preparação"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        orders={done}
        icon="✅"
        title="Pronto"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  )
}
