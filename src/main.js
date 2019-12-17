import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(VueRouter);
Vue.config.productionTip = false
import test from './components/test.vue';
import Create from './components/Create.vue';
import List from './components/List.vue';
import Edit from './components/EditForm.vue';
import CreateForm from './components/CreateForm.vue';

const routes = [
  {
      name: 'create',
      path: '/create',
      component: Create
  },
  {
      name: 'List',
      path: '/List',
      component: List
  },
  {
      name: 'EditForm',
      path: '/EditForm/:id',
      component: Edit
  }
,{
    name: 'CreateForm',
    path: '/CreateForm',
    component: CreateForm
}
,{ path: "/List", name: "List", List: List },
{
    name: 'test',
    path: '/test',
    component: test
}];

const router = new VueRouter({ mode: 'history', routes: routes});
router.replace("List");
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
