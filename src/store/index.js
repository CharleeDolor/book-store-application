import { createStore } from 'vuex'

export default createStore({
    name: 'store',
    state: {
        books: [
            [
                { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99 },
                { name: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10.99 },
            ],
            [
                { name: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', price: 15.99 },
                { name: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', price: 16.99 },
                { name: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', price: 17.99 }
            ],
            [
                { name: 'Noli Me Tangere', author: 'Jose Rizal', price: 8.99 },
                { name: 'El Filibusterismo', author: 'Jose Rizal', price: 9.99 },
            ],
            [
                { name: 'Pride and Prejudice', author: 'Jane Austen', price: 8.99 },
                { name: 'Sense and Sensibility', author: 'Jane Austen', price: 10.99 },
                { name: 'Emma', author: 'Jane Austen', price: 9.99 }
            ],
            [
                { name: 'The Hobbit', author: 'J.R.R. Tolkien', price: 13.99 },
                { name: 'The Lord of the Rings: The Fellowship of the Ring', author: 'J.R.R. Tolkien', price: 18.99 },
                { name: 'The Lord of the Rings: The Two Towers', author: 'J.R.R. Tolkien', price: 19.99 }
            ],
            [
                { name: 'The Da Vinci Code', author: 'Dan Brown', price: 11.99 },
                { name: 'Angels & Demons', author: 'Dan Brown', price: 12.99 },
                { name: 'Inferno', author: 'Dan Brown', price: 14.99 }
            ],
            [
                { name: 'The Hunger Games', author: 'Suzanne Collins', price: 10.99 },
                { name: 'Catching Fire', author: 'Suzanne Collins', price: 11.99 },
                { name: 'Mockingjay', author: 'Suzanne Collins', price: 12.99 }
            ],
            [
                { name: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', price: 9.99 },
                { name: 'The Restaurant at the End of the Universe', author: 'Douglas Adams', price: 10.99 }
            ],
            [
                { name: 'The Shining', author: 'Stephen King', price: 12.99 },
                { name: 'It', author: 'Stephen King', price: 14.99 }
            ],
            [
                { name: 'The Alchemist', author: 'Paulo Coelho', price: 11.99 },
                { name: 'Veronika Decides to Die', author: 'Paulo Coelho', price: 10.99 }
            ]
        ],
        cart: [],
        isAuthenticated: false,
    },
    getters: {
        availableBooks: state => {
            return state.books
        },
        cartItems: state => {
            return state.cart
        },
        cartTotalPrice: state => {
            return state.cart.reduce((total, item) => total + item.price, 0)
        }
    },
    mutations: {
        addToCart: (state, book) => {
            state.cart.push(book)
        },
        removeFromCart: (state, bookId) => {
            var index = state.cart.findIndex(item => item.id === bookId)
            if (index !== -1) {
                state.cart.splice(index, 1)
            }
        },
        updateAuthenticationStatus: (state, status) => {
            state.isAuthenticated = status
        },
    },
    actions: {
        handlePurchase: ({ commit, state }) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    state.cart.forEach(book => {
                        commit('removeFromCart', book.id)
                    })
                    resolve('Purchase successful')
                }, 1000)
            })
        },
        simulateAuthentication: ({ commit }, { username, password }) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'user' && password === 'password') {
                        commit('updateAuthenticationStatus', true)
                        resolve('Authentication successful')
                    } else {
                        reject('Authentication failed')
                    }
                }, 1000)
            })
        },
    }
})