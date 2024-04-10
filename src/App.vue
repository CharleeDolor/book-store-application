<template>
  <router-view/>
</template>

<style>
body{
  display: flex;
  align-items: center;
  justify-content: center;
}
button{
  cursor: pointer;
  padding: 0.5rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.item-unavailable{
  background-color: gray;
}
</style>
