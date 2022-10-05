<template>
    <nav class="navbar navbar-expand-lg navbar-fixed-top border">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">CrudApp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/authors">Authors</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/books">Books</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="this.$store.state.token">
            <a class="btn btn-outline-primary" v-on:click="logout()" role="button">Logout</a>
        </div>
        <div class="d-flex" v-else>
            <a class="btn btn-outline-primary" href="/login" role="button">Login</a>
            <a class="btn btn-outline-primary" href="/register" role="button">Register</a>
        </div>
    </nav>
</template>
<script>
import axios from 'axios'
export default {
    created() {
        if (localStorage.getItem('token')) {
            this.$store.commit('setToken', localStorage.getItem('token'))
        }
    },
    methods: {
        logout: function (e) {
            axios.post('http://localhost:8000/api/logout', null, {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.$store.commit('deleteToken')
                    localStorage.removeItem('token')
                })
                .catch(e => {
                    console.error(e)
                })
        }
    }
}
</script>