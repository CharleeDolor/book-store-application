import { createStore } from 'vuex'

export default createStore({
    name: 'store',
    state: {
        books: [
            { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, stockQuantity: 10},
            { name: 'Tender is the Night', author: 'F. Scott Fitzgerald', price: 10.99, stockQuantity: 10 },

            { name: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', price: 15.99, stockQuantity: 10 },
            { name: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', price: 16.99, stockQuantity: 10 },
            { name: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', price: 17.99, stockQuantity: 10 },

            { name: 'Noli Me Tangere', author: 'Jose Rizal', price: 8.99, stockQuantity: 10 },
            { name: 'El Filibusterismo', author: 'Jose Rizal', price: 9.99, stockQuantity: 10 },

            { name: 'Pride and Prejudice', author: 'Jane Austen', price: 8.99, stockQuantity: 10 },
            { name: 'Sense and Sensibility', author: 'Jane Austen', price: 10.99, stockQuantity: 10 },
            { name: 'Emma', author: 'Jane Austen', price: 9.99, stockQuantity: 10 },

            { name: 'The Hobbit', author: 'J.R.R. Tolkien', price: 13.99, stockQuantity: 10 },
            { name: 'The Lord of the Rings: The Fellowship of the Ring', author: 'J.R.R. Tolkien', price: 18.99, stockQuantity: 10 },
            { name: 'The Lord of the Rings: The Two Towers', author: 'J.R.R. Tolkien', price: 19.99, stockQuantity: 10 },

            { name: 'The Da Vinci Code', author: 'Dan Brown', price: 11.99, stockQuantity: 10 },
            { name: 'Angels & Demons', author: 'Dan Brown', price: 12.99, stockQuantity: 10 },
            { name: 'Inferno', author: 'Dan Brown', price: 14.99, stockQuantity: 10 },

            { name: 'The Hunger Games', author: 'Suzanne Collins', price: 10.99, stockQuantity: 10 },
            { name: 'Catching Fire', author: 'Suzanne Collins', price: 11.99, stockQuantity: 10 },
            { name: 'Mockingjay', author: 'Suzanne Collins', price: 12.99, stockQuantity: 10 },

            { name: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', price: 9.99, stockQuantity: 10 },
            { name: 'The Restaurant at the End of the Universe', author: 'Douglas Adams', price: 10.99, stockQuantity: 10 },

            { name: 'The Shining', author: 'Stephen King', price: 12.99, stockQuantity: 10 },
            { name: 'It', author: 'Stephen King', price: 14.99, stockQuantity: 10 },

            { name: 'The Alchemist', author: 'Paulo Coelho', price: 11.99, stockQuantity: 10 },
            { name: 'Veronika Decides to Die', author: 'Paulo Coelho', price: 10.99, stockQuantity: 10 }
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
            return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
        }
    },
    mutations: {
        addToCart: (state, book) => {
            let quantity = prompt("How many copies for " + book.name + "?");

            // check if quantity is invalid (quantity is greater than stockQuantity)
            let isInvalidQuantity = false;
            for(let i = 0; i < state.books.length; i++){
                if(quantity > state.books[i].stockQuantity){
                    
                    isInvalidQuantity = true;
                    break;
                }
            }

            // check if quantity is invalid upon checking
            if(isInvalidQuantity){
                alert("Insufficient stocks for " + book.name);
                return;
            }

            if(state.cart.length == 0){
                // push the book in the cart
                state.cart.push(book);

                //get the first item and create a new array key quantity with value quantity 
                state.cart[0].quantity = quantity;
                alert(book.name + " successfully added to cart");
                return;
            }

            // check if book is already in cart
            let isExist = false
            // loop through cart array and find if book exist in cart
            for(let i = 0; i < state.cart.length; i++){
                if(state.cart[i].name == book.name){
                    isExist = true;
                    // change the value of current cart item by adding the quantity
                    state.cart[i].quantity = parseInt(state.cart[i].quantity) + parseInt(quantity);
                    break;
                }
            }

            // check if item does not exist in cart
            if(!isExist){
                // push the book in the cart
                state.cart.push(book);
                //get the latest cart item and create a new array key quantity with value quantity 
                state.cart[state.cart.length-1].quantity = quantity;
                alert(book.name + " successfully added to cart");
                return;
            } else {
                // this means that book is already in cart and already added quantity to the cart
                alert(book.name + " successfully added to cart");
            }
        },

        // mutations with optional parameter removing all or an item
        removeFromCart: (state, bookId = null) => {

            // will trigger purchasing procedure, or bookId is null
            if(bookId == null){

                // loop (nested loop) through cart array and find each item in the books
                for(let i = 0; i < state.cart.length; i++){
                    for(let j = 0; j < state.books.length; j++){
                        // check if current cart item name is equals to current book name
                        if(state.cart[i].name == state.books[j].name){
                            // change the value of stock quantity of the purchased book
                            state.books[j].stockQuantity = parseInt(state.books[j].stockQuantity) - parseInt(state.cart[i].quantity);
                            // // check if their quantity is equal
                            // if(state.cart[i].quantity == state.books[j].stockQuantity){
                            //     // remove current book from books
                            //     state.books.splice(j, 1);
                            // }
                        }
                    }
                }

                // clears cart items, this means that items are purchased and to be delivered
                state.cart = [];

                // exits the execution of the method
                return;
            }

            // triggers when bookId has value, this means that user want to remove an item in cart
            state.cart.splice(bookId, 1);
        },
        updateAuthenticationStatus: (state, status) => {
            state.isAuthenticated = status
        },
    },
    actions: {
        asyncAddBook(context, book){
            context.commit('addToCart', book);
        },
        asyncRemoveBook(context, bookId){
            context.commit('removeFromCart', bookId);
        },
        handlePurchase: ({ commit, state }) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // call removeFromCart mutations
                    commit('removeFromCart')

                    // exclude books that have no quantity left
                    state.books = state.books.filter(book => book.stockQuantity != 0);
                    
                    resolve('Purchase successful')
                }, 1000)
            })
        },
        simulateAuthentication: ({ commit }, { username, password }) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'user' && password === 'password') {
                        commit('updateAuthenticationStatus', true);
                        resolve('Authentication successful');
                    } else {
                        reject('Authentication failed')
                    }
                }, 1000)
            })
        },
    }
})