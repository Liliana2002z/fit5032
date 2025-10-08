<template>
  <div class="api-display-container">
    <div v-if="jsonData" class="json-content">
      <pre>{{ JSON.stringify(jsonData, null, 2) }}</pre>
    </div>
    
    <div v-else-if="error">
      <p class="error-message">Error: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const FIREBASE_FUNCTION_URL = 'https://countbooks-ibmhkhju7a-uc.a.run.app'; 

const jsonData = ref(null);
const error = ref(null);

const getBookCountAPI = async () => {
    try {
        const response = await axios.get(FIREBASE_FUNCTION_URL);
        jsonData.value = response.data;
    } catch (err) {
        console.error('Error fetching API data:', err);
        error.value = 'Failed to fetch API data.';
    }
};

onMounted(() => {
    getBookCountAPI();
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
    text-align: center; 

}

pre {
    margin: 0;
    font-family: monospace;
    font-size: 1.2em;

    background: none; 
    text-align: left; 
}

.error-message {
    color: red;
}
</style>