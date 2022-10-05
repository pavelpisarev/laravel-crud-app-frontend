<template>
    <div class="container d-flex align-items-center justify-content-center text-center mw-100 p-5">
        <form v-on:submit.prevent="updateEntry">
            <label class="sr-only">Book title</label>
            <input v-model="form.title" class="form-control" placeholder="title" autofocus>
            <br />
            <label class="sr-only">Author</label>
            <select v-model="selected" class="form-select">
                <option v-for="author, index in authors" :value="author" :key="author.id">
                    {{ author.name }}
                </option>
            </select>
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
            title: null,
        },
        selected: null
    }),
    created: function() {
        if (localStorage.getItem('token') === null) {
                alert('Unauthorized')
                this.$router.push('/books')
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
                })
        },
        updateEntry: function (e) {
            let path = window.location.pathname
            let arr = path.split('/')
            let id = window.location.pathname.split('/')[arr.length - 1]
            axios.put(`http://localhost:8000/api/books/${id}`, this.$data.form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.$router.push('/books')
                })
                .catch(e => {
                    console.error(e)
                })
        },
    }
}
</script>