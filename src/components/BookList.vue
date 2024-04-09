<template>
   <div>
    <button @click="gotoMyCart"> My cart</button>

    <div class="control-panel">
      <input type="text" v-model="searchKey"><button @click="searchBook(this.searchKey)">Search</button>
    </div>

    <table>
      <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Price</th>
        <th>Available Copies</th>
      </tr>
      <tr v-for="book in this.searchedItems" :key="book.name" class="item" @click="addToCart(book)">
        <td>{{ book.name }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.price }}</td>
        <td>{{ book.stockQuantity }}</td>
      </tr>
    </table>
  </div>
</template>
  
<script>
export default {

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
      alert(book.name + " successfully added to cart");
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
table{
  margin: 1rem;
}

tr.item{
  cursor: pointer;
}

tr.item:hover{
  background-color: bisque;
}
button{
  margin: 1rem;
}
</style>
  