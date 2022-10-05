<template>
    <div class="container d-flex align-items-center justify-content-center text-center mw-100 p-5">
        <form v-on:submit.prevent="createEntry">
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
            <button class="btn btn-primary btn-block">Create</button>
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
    created() {
        if (localStorage.getItem('token') === null) {
                alert('Unauthorized')
                this.$router.push('/books')
        }
        axios.get('http://localhost:8000/api/authors')
            .then(response => {
                this.authors = response.data
            })
            .catch(e => {
                this.errors.push(e)
            })
    },
    methods: {
        createEntry: function (e) {
            axios.post('http://localhost:8000/api/books', { title: this.form.title, author_id: this.selected.id }, {
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