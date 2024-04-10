<template>
    <h1>Sorry you are not allowed here.</h1>
    <button @click="gotoHomepage">Back to Homepage</button>
</template>

<script>
export default{
    methods:{
        gotoHomepage(){
            this.$router.push({path: '/'});
        }
    }
}
</script>