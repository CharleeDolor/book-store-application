<template>
  <div class="container">
    <h2 class="top-heading">User Login</h2>
    <div class="login-container">
      <!-- <div v-if="!isAuthenticated">
        <form @submit.prevent="login">
          <input type="text" v-model="credentials.username" placeholder="Username" />
          <input type="password" v-model="credentials.password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p v-if="error">{{ error }}</p>
      </div>
      <div v-else>
        <p>Welcome back, user!</p>
        <button @click="logout">Logout</button>
      </div> -->
   
    <div class="category">
      <form @submit.prevent="login" class="login-form">
        <input type="text" v-model="credentials.username" placeholder="Enter your Username" />
        <input type="password" v-model="credentials.password" placeholder="Enter your Password"/>
        <button type="submit" class="login-btn"> Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</div>
</template>
  
  <script>
  export default {
    data() {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: null,
        isAuthenticated: false
      };
    },
    methods: {
      login() {
        this.error = null; 
        this.$store.dispatch('simulateAuthentication', this.credentials)
          .then(() => {
            this.isAuthenticated = true;

            // push "/user" path to router
            this.$router.push({ path: '/user'});
          })
          .catch(error => {
            this.error = error; // Display error message
          });
      },
      logout() {
        this.$store.commit('updateAuthenticationStatus', false);
        this.isAuthenticated = false;
      }
    },
    created() {
      this.isAuthenticated = this.$store.state.isAuthenticated;
    }
  };
  </script>

  
<style scoped></style>
