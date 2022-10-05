import Index from './views/Index.vue'
import Authors from './views/author/Authors.vue'
import AuthorsAdd from './views/author/AuthorsAdd.vue'
import AuthorsEdit from './views/author/AuthorsEdit.vue'
import Books from './views/book/Books.vue'
import BooksAdd from './views/book/BooksAdd.vue'
import BooksEdit from './views/book/BooksEdit.vue'
import NotFound from './views/NotFound.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

export const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/authors', component: Authors },
    { path: '/authors/add', component: AuthorsAdd },
    { path: '/authors/edit/:id', component: AuthorsEdit },
    { path: '/books', component: Books },
    { path: '/books/add', component: BooksAdd },
    { path: '/books/edit/:id', component: BooksEdit },
    { path: '/:pathMatch(.*)*', component: NotFound },
]