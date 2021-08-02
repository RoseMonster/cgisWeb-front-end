import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import AdmainLogin from '../views/AdmainLogin'
import SuperAdmainLogin from '../views/SuperAdmainLogin'
import PointData from '../views/PointData'
import AdmainData from '../views/AdmainData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/AdmainLogin',
      name: 'AdmainLogin',
      component: AdmainLogin
    },
    {
      path: '/SuperAdmainLogin',
      name: 'SuperAdmainLogin',
      component: SuperAdmainLogin
    },
    {
      path: '/PointData',
      name: 'PointData',
      component: PointData
    },
    {
      path: '/AdmainData',
      name: 'AdmainData',
      component: AdmainData
    }
  ]
})
