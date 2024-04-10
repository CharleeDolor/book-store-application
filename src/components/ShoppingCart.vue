<template>
  <div>
    <h1>My Cart</h1>
    <button @click="gotoBookList" class="shop-btn">Shop</button>

    <div v-if="booksInCart.length > 0">
      <table class="center-table"> <!-- Added class for centering -->
      <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
      <tr v-for="(book, index) in booksInCart" :key="index" class="item" @click="removeItem(index, book)">
        <td>{{ book.name }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.price }}</td>
        <td class="td-quantity" v-on:click.stop="">
          <button @click="addQuantity(book)"> + </button>
          {{ book.quantity }}
          <button @click="reduceQuantity(book)"> - </button>
        </td>

        <td v-on:click.stop=""><button @click="removeItem(index, book)">Remove</button></td>
      </tr>
    </table>
    <p>Total Price: {{ this.$store.getters.cartTotalPrice }}</p>
    <button @click="purchaseItems()">Purchase Items in Cart</button>
    </div>

    <!-- Display a message if there are no items to purchase -->
    <h3 v-if="booksInCart.length === 0">No items to purchase.</h3>
  </div>
</template>

<script>
export default {
  beforeMount(){
    if(!this.$store.state.isAuthenticated){
      this.$router.push({path: '/forbidden'});
    }
  },
  
  data(){
    return {
      isManage: false
    }
  },

  computed:{
    booksInCart(){
      return this.$store.getters.cartItems;
    }
  },

  methods:{
    removeItem(index, book){
      let conf = confirm("Are you sure to remove "+ book.name +" from the cart?");
      if(conf){
        alert(book.name, " with the quantity of ", book.quantity, " is deleted.");
        this.$store.dispatch('asyncRemoveBook', index);
        
      } else {
        alert("Deletion cancelled");
      }
    },
    activateManageItems(){
      this.isManage = !this.isManage;
    },

    gotoBookList(){
      this.$router.push({ path: '/user'});
    },

    addQuantity(book){
      if(parseInt(book.quantity) === parseInt(book.stockQuantity)){
        alert("Cannot add anymore");
        return;
      }
      book.quantity = parseInt(book.quantity) + 1;
    },

    reduceQuantity(book){
      if(parseInt(book.quantity) === 1){
        alert("Cannot reduce quantity anymore");
        return;
      }
      book.quantity = parseInt(book.quantity) - 1;
    },

    purchaseItems(){
      // Check if there are any items in the cart
      if (this.booksInCart.length === 0) {
        alert("No items to purchase."); // Display a message if no items are in the cart
        return; // Exit the method early if there are no items
      }

      // If there are items, proceed with the purchase process
      this.$store.dispatch('handlePurchase')
        .then(result => {
          alert(result);
          // component for book receipt (a suggestion, not required);
        })
        .catch(error => {
          alert("Please try again", error);
        });
    }
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 0.5rem;
}
table.center-table { /* Defined centering for the table */
  margin: auto;
}

tr.item{
  cursor: pointer;
}

tr.item:hover{
  background-color: bisque;
}

.control-panel{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5;
}

.td-quantity{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

</style>