<template>
  <div class="home">
    <authentication-user/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserAuthentication from '@/components/UserAuthentication.vue'

export default {
  name: 'HomeView',
  components: {
    'authentication-user': UserAuthentication,
  }
}
</script>
