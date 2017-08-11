import Vue from 'vue'
import Router from 'vue-router'
import RouteDelegate from './RouteDelegate'
import Webhooks from '@/components/webhooks/List'
import NewWebhook from '@/components/webhooks/Create'
import EditWebhook from '@/components/webhooks/Edit'
import Projects from '@/components/projects/List'
import NewProject from '@/components/projects/Create'
import Events from '@/components/events/List'
import WebhookResults from '@/components/webhookResults/List'
import Contracts from '@/components/contracts/List'
import NewContract from '@/components/contracts/Create'
import EditContract from '@/components/contracts/Edit'
import Contract from '@/components/contracts/Item'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Settings from '@/components/settings/Menu'
import SettingsGeneral from '@/components/settings/General'
import SettingsTeam from '@/components/settings/Team'
import SettingsBilling from '@/components/settings/Billing'
import Plans from '@/components/plans/List'

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
      meta: { auth: true, project: true },
      children: [
        {
          path: '',
          name: 'Webhooks',
          component: Webhooks
        },
        {
          path: 'new',
          name: 'NewWebhook',
          component: NewWebhook,
          props: route => route.query
        },
        {
          path: ':id',
          name: 'Webhook',
          component: Events,
          props: true
        },
        {
          path: ':id/edit',
          name: 'EditWebhook',
          component: EditWebhook,
          props: true
        },
        {
          path: ':webhookId/:id',
          name: 'Event',
          component: WebhookResults,
          props: true
        }
      ]
    },
    {
      path: '/contracts',
      component: RouteDelegate,
      meta: { auth: true, project: true },
      children: [
        {
          path: '',
          name: 'Contracts',
          component: Contracts
        },
        {
          path: 'new',
          name: 'NewContract',
          component: NewContract
        },
        {
          path: ':id',
          name: 'Contract',
          component: Contract,
          props: true
        },
        {
          path: ':id/edit',
          name: 'EditContract',
          component: EditContract,
          props: true
        }
      ]
    },
    {
      path: '/projects',
      component: RouteDelegate,
      meta: { auth: true },
      children: [
        {
          path: '',
          name: 'Projects',
          component: Projects,
          meta: { project: true }
        },
        {
          path: 'create',
          name: 'NewProject',
          component: NewProject
        }
      ]
    },
    {
      path: '/settings',
      component: Settings,
      meta: { auth: true, project: true },
      children: [
        {
          path: '',
          name: 'Settings',
          redirect: 'general'
        },
        {
          path: 'general',
          name: 'SettingsGeneral',
          component: SettingsGeneral
        },
        {
          path: 'team',
          name: 'SettingsTeam',
          component: SettingsTeam
        },
        {
          path: 'billing',
          name: 'SettingsBilling',
          component: SettingsBilling
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { auth: false }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: { auth: false }
    },
    {
      path: '/plans',
      name: 'Plans',
      component: Plans,
      meta: { auth: true, project: true }
    }
  ]
})
