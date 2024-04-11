<template>
  <div>
    <div>
      <button @click="logout" class="logout-btn">Logout</button>
      <button @click="gotoMyCart"> My cart</button>
    </div>
    

    <div class="control-panel">
      <input type="text" v-model="searchKey"><button @click="searchBook(searchKey)">Search</button>
    </div>

    <table class="center-table">
      <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Price</th>
        <th>Available Copies</th>
      </tr>
      <tr v-for="book in searchedItems" :key="book.name" class="item" @click="addToCart(book)">
        <td class="name">{{ book.name }}</td>
        <td class="author">{{ book.author }}</td>
        <td class="price">{{ book.price }}</td>
        <td class="quantity">{{ book.stockQuantity }}</td>
      </tr>
    </table>
  </div>
</template>
  
<script>
export default {

  beforeMount(){
    if(!this.$store.state.isAuthenticated){
      this.$router.push({path: '/forbidden'});
    }
    
    console.log(this.$store.state.isAuthenticated);
  },
  data(){
    return{
      searchKey: '',
      searchedItems: this.$store.getters.availableBooks,
    }
  },

  computed:{
    getBooks(){
      return this.$store.getters.availableBooks;
    }
  },
  
  methods:{
    gotoMyCart(){
      this.$router.push({path: '/cart'});
    },

    addToCart(book){
      this.$store.dispatch('asyncAddBook', book);
    },

    searchBook(val){
      this.searchedItems = this.getBooks.filter(
        item => item.name.toLowerCase().match( val.toLowerCase() )
      );

      // if searchkey value not found, diplay an error message
      if(this.searchedItems.length == 0){
        alert("No books found for " + val);
        // load all available books getBooks computed property
        this.searchedItems = this.getBooks;
      }
    },

    logout() {
      this.$store.commit('updateAuthenticationStatus', false);
      this.isAuthenticated = false;

      alert("logged out");
      //push base path to router
      this.$router.push({path: '/'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 0.5rem;
}
.center-table {
  margin: auto; /* Center the table horizontally */
}

tr.item{
  cursor: pointer;
}

tr.item:hover{
  background-color: bisque;
}
.name,
.author{
  text-align: center;
}

.price,
.quantity{
  text-align: right;
  width: 8rem;
}

.logout-btn{
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>