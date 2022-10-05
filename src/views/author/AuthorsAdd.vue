<template>
    <div class="container d-flex align-items-center justify-content-center text-center mw-100 p-5">
        <form v-on:submit.prevent="createEntry">
            <label class="sr-only">Author name</label>
            <input v-model="form.name" class="form-control" placeholder="name" required autofocus>
            <br />
            <button class="btn btn-primary btn-block">Create</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        form: {
            name: null,
        },
    }),
    created: function () {
        if (localStorage.getItem('token') === null) {
            alert('Unauthorized')
            this.$router.push('/authors')
        }
    },
    methods: {
        createEntry: function (e) {
            axios.post('http://localhost:8000/api/authors', this.form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.$router.push('/authors')
                })
                .catch(e => {
                    console.error(e)
                })
        }
    }
}
</script>