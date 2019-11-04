import Goods from '@/views/home/goods.vue'
import Order from '@/views/home/order.vue'
import Customer from '@/views/home/customer.vue'
import Shop from '@/views/home/shop.vue'

export default {
  path: '/',
  name: 'home',
  meta: {
    title: 'home',
    requireAuth: false
  },
  component: () => import('@/views/home/index.vue'),
  children: [{
    path: '/',
    name: 'goods',
    component: Goods,
    meta: {
      title: 'goods',
      keepAlive: true,
      requireAuth: false
    }
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta: {
      title: 'order',
      requireAuth: false
    }
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    meta: {
      title: 'customer',
      requireAuth: false
    }
  }, {
    path: '/shop',
    name: 'shop',
    component: Shop,
    meta: {
      title: 'shop',
      requireAuth: false
    }
  }]
}
