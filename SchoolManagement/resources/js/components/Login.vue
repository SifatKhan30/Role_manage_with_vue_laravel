<template>
    <div class="container">
        <h1 class="text-center">Login Form</h1>
        <div class="col-md-7 offset-md-3 bg-secondary">
        <div class="col-md-6 offset-md-2 ">
            <form action="javascript:void(0)">
                <div v-if="Object.keys(validationErrors).length > 0">
                    <div class="alert alert-danger">
                        <ul class="mb-0" style="list-style: none;">
                            <li v-for="(value, key) in validationErrors" :key="key">
                                {{ value[0] }}
                            </li>
                        </ul>
                    </div>
                </div>
            <label for="">Email</label>
                <input type="text" v-model="email" class="form-control">
                <label for="">Password: </label>
                <input type="text" v-model="password" class="form-control">
                <button @click="signin" class="btn btn-lg btn-success">Login</button>
            </form>
        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: "",
            validationErrors: {},
            processing: false,
        }
    },
    methods: {
        ...mapActions({
            login: "auth/login",
        }),
        async signin() {
            await axios.get("/sanctum/csrf-cookie")
            await axios.post("/login",
                { email: this.email, password: this.password },
                { headers: { "Accept": "application/json" } })
                .then(({ data }) => {
                    console.log(data)
                    this.login();
                })
                .catch(({ response }) => {
                    console.log(response)
                    if (response.status === 422) {
                        this.validationErrors = response.data.errors;
                    } else {
                        this.validationErrors = {};
                        alert(response.data.message);
                    }
                })
                .finally(() => {
                    this.processing = false;
                });

        },
    }
}
</script>