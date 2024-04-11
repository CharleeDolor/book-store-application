<template>
    <!-- Display message and button -->
    <h1>Sorry you are not allowed here.</h1>
    <button @click="gotoHomepage">Back to Homepage</button>
</template>

<script>
export default {
    methods: {
        // Method to navigate back to homepage
        gotoHomepage() {
            // Use Vue Router's $router.push() method to navigate to the homepage
            this.$router.push({ path: '/' });
        }
    }
}
</script>
