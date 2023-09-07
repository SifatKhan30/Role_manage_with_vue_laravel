<template>
    <div class="container col-md-8">
        <h1>Dashboard of {{ $store.state.auth.user.name }}</h1>
        <button @click="logout" class="btn btn-danger">Logout</button>
        <table class="table table-bordered table-striped table-hover">
            <thead class="table table-dark">
                <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
              
            </thead>
            <tbody>
                <tr v-for="(d , i) in users" :key="i">
                    <td>{{ i+1 }}</td>
                    <td>{{ d.name }}</td>
                    <td>{{ d.email }}</td>
                    <td>{{ d.role }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    name: 'Dashboard',
    data(){
        return{
            users:[],
        }
    },
    methods: {
        ...mapActions({
            signout: 'auth/logout'
        }),
        logout() {
            this.signout()
        },

    },
    mounted(){
        axios.get('/api/list')
        .then(({data})=>{
            console.log(data)
            this.users=data
        })
    }
}
</script>