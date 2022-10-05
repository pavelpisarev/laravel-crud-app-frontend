<template>
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th class="text-center" style="width:5%" scope="col">id</th>
                <th class="text-center">Book title</th>
                <th class="text-center" style="width:20%">Book author</th>
                <th class="text-center" style="width:20%">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(book, index) in books" :key="index">
                <th class="align-middle text-center">{{index+1}}</th>
                <td class="align-middle text-center">{{book.title}}</td>
                <td class="align-middle text-center">{{book.author.name}}</td>
                <td class="align-middle d-flex justify-content-center">
                    <button type="button" class="btn btn-success" v-on:click="chechToken(`/books/edit/${book.id}`)">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button"
                        v-on:click="deleteEntry(book.id)"
                        class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            <tr>
            </tr>
        </tbody>
    </table>
    <div class="row container-fluid justify-content-center">
        <td class="text-center" v-on:click="chechToken('/books/add')" colspan="3"><a class="btn btn-outline-primary"
                role="button">Add</a></td>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    data: () => ({
        books: [],
        errors: []
    }),
    created() {
        this.getEntries()
    },
    methods: {
        chechToken: function (path) {
            if (localStorage.getItem('token') === null) {
                alert('Unauthorized')
                return
            }
            this.$router.push(path)
        },
        getEntries: function () {
            axios.get('http://localhost:8000/api/books')
                .then(response => {
                    this.books = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        deleteEntry: function (id) {
            if (localStorage.getItem('token') === null) {
                alert('Unauthorized')
                return
            }
            axios.delete(`http://localhost:8000/api/books/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    let index = this.$data.books.findIndex((obj) => obj.id == id)
                    this.$data.books.splice(index, 1)
                })
                .catch(e => {
                    console.error(e)
                    if (e.response.status == 401) {
                        alert('Unauthorized')
                    }
                })
        }
    },
}
</script>