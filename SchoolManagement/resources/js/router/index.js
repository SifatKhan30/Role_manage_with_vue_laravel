import { createRouter, createWebHistory } from "vue-router";
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Teacher from '../components/Teacher.vue'
import Guardian from '../components/Guardian.vue'
import Student from '../components/Student.vue'
import store from "../store";

const routes=[
    {
        name:'login',
        path:'/',
        component: Login,
        meta:{
            middleware:'guest'
        }
    },
    {
        name:'dashboard',
        path:'/dashboard',
        component: Dashboard,
        meta:{
            middleware:'auth'
        }
    },
    {
        name:'teacher',
        path:'/teacher',
        component: Teacher,
        meta:{
            middleware:'auth'
        }
    },
    {
        name:'guardian',
        path:'/guardian',
        component: Guardian,
        meta:{
            middleware:'auth'
        }
    },
    {
        name:'student',
        path:'/student',
        component: Student,
        meta:{
            middleware:'auth'
        }
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.meta.middleware=='guest'){
        if(store.state.auth.auth){
            if(store.state.auth.user.role == "admin"){
                next({name:'dashboard'})
            }else if(store.state.auth.user.role == "teacher"){
                next({name:'teacher'})
            }else if(store.state.auth.user.role == "guardian"){
                next({name:'guardian'})
            }
            next({name:'student'})
        }
        next()
    }else{
        if(store.state.auth.auth){
            next()
        }
        next({name:'login'})
    }
})
export default router;