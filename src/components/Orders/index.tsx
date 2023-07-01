import { Order } from '../../types/Order'
import { OrdersBoard } from '../OrdersBoard'
import { Container } from './styles'

const orders: Order[] = [
  {
    _id: '649cda7929cffa31c5db5dd1',
    table: '123',
    status: 'IN_PRODUCTION',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1688000164799-quatro-queijos.png',
          price: 40,
        },
        quantity: 3,
        _id: '649cda7929cffa31c5db5dd2',
      },
      {
        product: {
          name: 'Coca cola',
          imagePath: '1688000621878-coca-cola.png',
          price: 7,
        },
        quantity: 2,
        _id: '649cda7929cffa31c5db5dd3',
      },
    ],
  },
]

export function Orders() {
  return (
    <Container>
      <OrdersBoard orders={orders} icon="🕐" title="Fila de espera" />
      <OrdersBoard orders={[]} icon="🧑🏼‍🍳" title="Em preparação" />
      <OrdersBoard orders={[]} icon="✅" title="Pronto" />
    </Container>
  )
}
