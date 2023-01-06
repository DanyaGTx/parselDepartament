import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import { Server, Model, Factory } from 'miragejs'
import { getAllRequestsFromStorage } from './utils/utils.js'

const server = new Server({
    models: {
        request: Model,
    },
    seeds(server) {
        if (!localStorage.getItem('allRequestsList')) {
            server.create("request", {
                USER_ID: 0,
                form: {
                    cityFrom: 'cityFrom11',
                    cityTo: 'cityTo1',
                    typeOfParcel: 'gadgets',
                    date: '09.05.2022',
                    desc: 'description1'
                }
            })
            server.create("request", {
                USER_ID: 0,
                form: {
                    cityFrom: 'cityFrom11',
                    cityTo: 'cityTo1',
                    typeOfParcel: 'gadgets',
                    date: '09.05.2022',
                    desc: 'description1'
                }
            })
            server.create("request", {
                USER_ID: 1,
                form: {
                    cityFrom: 'cityFrom11',
                    cityTo: 'cityTo1',
                    typeOfParcel: 'gadgets',
                    date: '09.05.2022',
                    desc: 'description1'
                }
            })
            localStorage.setItem('allRequestsList', JSON.stringify(server.db.dump().requests))
        }
    }
});


server.get('/api/requests', (schema) => {
    return JSON.parse(localStorage.getItem('allRequestsList'))
})
server.post('/api/requests', (schema, request) => {

    const USER_ID = localStorage.getItem('USER_ID')
    const allRequestsListToStorage = getAllRequestsFromStorage()
    const form = JSON.parse(request.requestBody).data

    allRequestsListToStorage.push({ USER_ID: +USER_ID, form })

    localStorage.setItem('allRequestsList', JSON.stringify(allRequestsListToStorage))
})


const app = createApp(App)
app.use(router)
app.mount('#app')
