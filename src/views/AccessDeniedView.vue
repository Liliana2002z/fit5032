<script setup>
</script>

<template>
  <div class="access-denied-container">
    <h2>Access Denied</h2>
    <p>You do not have permission to view this page. Please log in.</p>
    <router-link to="/login">Go to Login Page</router-link>
  </div>
</template>

<style scoped>
.access-denied-container {
  text-align: center;
  margin-top: 50px;
}
</style>