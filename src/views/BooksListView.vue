<template>
  <div>
    <h1><b>Welcome back, user!</b></h1>
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
}
</script>

<style>

h1{
  margin: 2rem;
}
</style>
