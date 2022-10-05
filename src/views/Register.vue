<template>
    <div class="container d-flex align-items-center justify-content-center text-center mw-100 p-5">
        <form v-on:submit.prevent="register">
            <h1 class="h3 mb-3 font-weight-normal">Register page</h1>
            <label class="sr-only">Username</label>
            <input v-model="registerForm.name" class="form-control" placeholder="username" required autofocus>
            <label class="sr-only">Email address</label>
            <input v-model="registerForm.email" class="form-control" placeholder="Email address" required>
            <label class="sr-only">Password</label>
            <input v-model="registerForm.password" type="password" class="form-control"
                placeholder="Password" required>
            <label class="sr-only">Confirm password</label>
            <input v-model="registerForm.password_confirmation" type="password" class="form-control"
                placeholder="Confirm password" required>
            <br />
            <button class="btn btn-primary btn-block">Register!</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        registerForm: {
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
        },
    }),
    methods: {
        register: function (e) {
            axios.post('http://localhost:8000/api/register', this.registerForm , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token)
                    this.$store.commit('setToken', response.data.token)
                    this.$router.push('/')
                })
                .catch(e => {
                    console.error(e)
                })
        }
    }
}
</script>