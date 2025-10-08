<template>
  <div class="api-display-container">
    <div v-if="jsonData" class="json-content">
      <pre>{{ JSON.stringify(jsonData, null, 2) }}</pre>
    </div>
    
    <div v-else-if="error">
      <p class="error-message">Error: {{ error }}</p>
    </div>
    <div v-else>
      <p>Loading all books API data...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const FIREBASE_FUNCTION_URL = 'https://us-central1-week7-xiaoqian.cloudfunctions.net/getAllBooks';

const jsonData = ref(null);
const error = ref(null);

const getAllBooksAPI = async () => {
    try {
        const response = await axios.get(FIREBASE_FUNCTION_URL);
        jsonData.value = response.data;
    } catch (err) {
        console.error('Error fetching API data:', err);
        error.value = 'Failed to fetch all books API data.';
    }
};

onMounted(() => {
    getAllBooksAPI();
});
</script>

<style scoped>
.api-display-container {
    min-height: 100vh; 
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding-top: 100px;
    margin-top: -60px;
}

.json-content {
    max-width: 80%;
    text-align: left;
    padding: 20px;
}

pre {
    margin: 0;
    font-family: monospace;
    font-size: 1.2em;
    color: #333;
    background: none;
    white-space: pre-wrap;
}

.error-message {
    color: red;
}
</style>