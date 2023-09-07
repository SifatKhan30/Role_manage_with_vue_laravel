<template>
    <div class="container">
        <h1>Student Section</h1>
        <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Student',
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