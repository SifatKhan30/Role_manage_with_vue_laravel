<template>
   <div class="container">
        <h1>Teacher Section</h1>
        <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Teacher',
    methods:{
        ...mapActions({
            signout:'auth/logout'
        }),
        logout(){
            this.signout()
        }
    }
}
</script>