import { createRouter,createWebHistory } from "vue-router"


import CreateOrderForm from '../components/CreateOrderForm.vue'
import DeliverOderForm from '../components/DeliverOderForm.vue'
import SelectRequest from '../components/SelectRequest.vue'
import AllRequestsList from '../components/AllRequestsList.vue'
import MyRequests from '../components/MyRequests.vue'

// const USER_ID = localStorage.getItem('USER_ID');

export default createRouter({
    
    history: createWebHistory(),
    mode: 'history',
    routes: [
        {path: `/create`, name: 'create', component: CreateOrderForm},
        {path: `/deliver`, name: 'deliver', component: DeliverOderForm},
        {path: `/select` , name: 'main', alias: '/' ,  component: SelectRequest},
        {path: '/requests' , name: 'requests', component: AllRequestsList},
        {path: `/:id/my-requests` , name: 'my-requests', component: MyRequests},
    ]
})