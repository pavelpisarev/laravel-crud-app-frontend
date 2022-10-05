<template>
    <div class="container d-flex align-items-center justify-content-center text-center mw-100 p-5">
        <form v-on:submit.prevent="updateEntry">
            <label class="sr-only">New name</label>
            <input v-model="form.name" class="form-control" placeholder="name" required autofocus>
            <br />
            <button class="btn btn-primary btn-block">Update</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        authors: [],
        errors: [],
        form: {
            name: null,
        },
    }),
    created: function () {
        if (localStorage.getItem('token') === null) {
            alert('Unauthorized')
            this.$router.push('/authors')
            
        }
        this.getEntries()
    },
    methods: {
        getEntries: function () {
            axios.get('http://localhost:8000/api/authors')
                .then(response => {
                    this.authors = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                    console.error(e)
                })
        },
        updateEntry: function () {
            let path = window.location.pathname
            let arr = path.split('/')
            let id = window.location.pathname.split('/')[arr.length - 1]
            axios.put(`http://localhost:8000/api/authors/${id}`, this.form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.authors = response.data
                    this.$router.push('/authors')
                })
                .catch(e => {
                    this.errors.push(e)
                    console.error(e)
                })
        }
    }
}
</script>