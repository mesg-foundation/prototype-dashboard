import Vue from 'vue'
import Router from 'vue-router'
import RouteDelegate from './RouteDelegate'
import Webhooks from '@/components/webhooks/List'
import NewWebhook from '@/components/webhooks/Create'
import Webhook from '@/components/webhooks/Item'
import Contracts from '@/components/contracts/List'
import Login from '@/components/Login'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (to.hash) { return { selector: to.hash } }
  if (savedPosition) { return savedPosition }
  return { x: 0, y: 0 }
}

export default new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      redirect: '/webhooks'
    },
    {
      path: '/webhooks',
      component: RouteDelegate,
      meta: { auth: true },
      children: [
        {
          path: '',
          name: 'Webhooks',
          component: Webhooks
        },
        {
          path: 'new',
          name: 'NewWebhook',
          component: NewWebhook
        },
        {
          path: ':id',
          name: 'Webhook',
          component: Webhook,
          props: true
        }
      ]
    },
    {
      path: '/contracts',
      component: RouteDelegate,
      meta: { auth: true },
      children: [
        {
          path: '',
          name: 'Contracts',
          component: Contracts
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { auth: false }
    }
  ]
})
