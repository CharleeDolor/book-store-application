<template>
  <div class="home">
    <authentication-user/>
    <book-list/>
    <shopping-cart/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserAuthentication from '@/components/UserAuthentication.vue'
import BookList from '@/components/BookList.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'

export default {
  name: 'HomeView',
  components: {
    'authentication-user': UserAuthentication,
    'book-list': BookList,
    'shopping-cart': ShoppingCart
  }
}
</script>
