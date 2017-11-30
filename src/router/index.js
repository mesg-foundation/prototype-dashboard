import Vue from 'vue'
import Router from 'vue-router'
import RouteDelegate from './RouteDelegate'
import Dashboard from '@/components/dashboard/Default'
import Triggers from '@/components/triggers/List'
import NewTrigger from '@/components/triggers/Create'
import EditTrigger from '@/components/triggers/Edit'
import NewProject from '@/components/projects/Create'
import Events from '@/components/events/List'
import NewEvents from '@/components/events/Create'
import Contracts from '@/components/contracts/List'
import NewContract from '@/components/contracts/Create'
import EditContract from '@/components/contracts/Edit'
import Contract from '@/components/contracts/Item'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Settings from '@/components/settings/Menu'
import SettingsGeneral from '@/components/settings/General'
import SettingsAddress from '@/components/settings/Address'
import SettingsTeam from '@/components/settings/Team'
import SettingsBilling from '@/components/settings/Billing'
import Plans from '@/components/plans/List'
import Logout from '@/components/Logout'
import Beta from '@/components/Beta'

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
      component: Dashboard,
      name: 'Dashboard',
      meta: { auth: true, project: true, beta: true }
    },
    {
      path: '/triggers',
      component: RouteDelegate,
      meta: { auth: true, project: true, beta: true },
      children: [
        {
          path: '',
          name: 'Triggers',
          component: Triggers
        },
        {
          path: 'new',
          name: 'NewTrigger',
          component: NewTrigger,
          props: route => route.query
        },
        {
          path: ':id',
          name: 'Trigger',
          component: Events,
          props: true
        },
        {
          path: ':id/edit',
          name: 'EditTrigger',
          component: EditTrigger,
          props: true
        },
        {
          path: ':triggerId/execute',
          name: 'ExecuteTrigger',
          component: NewEvents,
          props: true
        }
      ]
    },
    {
      path: '/contracts',
      component: RouteDelegate,
      meta: { auth: true, project: true, beta: true },
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
      meta: { auth: true, beta: true },
      children: [
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
      meta: { auth: true, project: true, beta: true },
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
          path: 'address',
          name: 'SettingsAddress',
          component: SettingsAddress
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
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: { auth: true }
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
      meta: { auth: true, project: true, beta: true }
    },
    {
      path: '/beta',
      name: 'Beta',
      component: Beta,
      meta: { auth: true, beta: false }
    }
  ]
})
