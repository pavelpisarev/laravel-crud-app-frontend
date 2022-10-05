<template>
    <div class="container d-flex align-items-center justify-content-center text-center mw-100 p-5">
        <form v-on:submit.prevent="login">
            <h1 class="h3 mb-3 font-weight-normal">Please log in</h1>
            <label class="sr-only">Email address</label>
            <input v-model="loginForm.email" class="form-control" placeholder="Email address" required autofocus>
            <label class="sr-only">Password</label>
            <input v-model="loginForm.password" type="password" id="inputPassword" class="form-control"
                placeholder="Password" required>
            <br />
            <button class="btn btn-primary btn-block">Log in</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        loginForm: {
            email: null,
            password: null,
        },
    }),
    methods: {
        login: function (e) {
            axios.post('http://localhost:8000/api/login', this.loginForm , {
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