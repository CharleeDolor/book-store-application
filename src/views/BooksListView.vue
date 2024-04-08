<template>
  <div>
    <p>Welcome back, user!</p>
    <button @click="logout">Logout</button>
    <BookList></BookList>
  </div>

  <div>

  </div>
</template>

<script>
import BookList from '@/components/BookList.vue';

export default {
  components:{
    BookList
  },

  methods: {
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
