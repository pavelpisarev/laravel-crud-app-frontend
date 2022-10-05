<template>
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th class="text-center" style="width:5%" scope="col">id</th>
                <th class="text-center">Name</th>
                <th class="text-center" style="width:20%">Books count</th>
                <th class="text-center" style="width:20%">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(author, index) in authors" :key="index">
                <th class="align-middle text-center">{{index+1}}</th>
                <td class="align-middle text-center">{{author.name}}</td>
                <td class="align-middle text-center">{{author.books_count}}</td>
                <td class="align-middle d-flex justify-content-center">
                    <button type="button" v-on:click="chechToken(`/authors/edit/${author.id}`)"
                        class="btn btn-success">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" v-on:click="deleteEntry(author.id)" class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            <tr>
            </tr>
        </tbody>
    </table>
    <div class="row container-fluid justify-content-center">
        <td class="text-center" colspan="3"><a class="btn btn-outline-primary"
                v-on:click="chechToken('/authors/add')" role="button">Add</a></td>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    data: () => ({
        authors: [],
        errors: [],
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
            axios.get('http://localhost:8000/api/authors')
                .then(response => {
                    this.authors = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                    console.error(e)
                })
        },
        deleteEntry: function (id) {
            if (localStorage.getItem('token') === null) {
                alert('Unauthorized')
                return
            }
            axios.delete(`http://localhost:8000/api/authors/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    let index = this.$data.authors.findIndex((obj) => obj.id == id)
                    this.$data.authors.splice(index, 1)
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