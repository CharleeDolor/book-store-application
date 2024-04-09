<template>
  <div>
    <h1>My Cart</h1>
    <button @click="gotoBookList" class="shop-btn">Shop</button>
    <div class="control-panel">
      <input 
        type="checkbox" 
        v-model="isManage" 
        @click="activateManageItems()"
      >
      <p>Edit Cart</p>
      
    </div>

    <table>
      <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
      <tr v-for="(book, index) in booksInCart" :key="index" class="item" @click="removeItem(index, book)">
        <td>{{ book.name }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.price }}</td>
        <td>{{ book.quantity }}</td>
      </tr>
    </table>
    <p>Total Price: {{ this.$store.getters.cartTotalPrice }}</p>
    <button @click="purchaseItems()" class="purchaseItem-btn">Purchase Items in Cart</button>
  </div>
</template>

<script>
export default {
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
      if(this.isManage){
        let conf = confirm("Are you sure to remove "+ book.name +" from the cart?");
        if(conf){
          this.$store.dispatch('asyncRemoveBook', index);
        }
      }
    },
    activateManageItems(){
      this.isManage = !this.isManage;
    },

    gotoBookList(){
      this.$router.push({ path: '/user'});
    },

    purchaseItems(){
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
table{
  margin: 1rem;
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

</style>
