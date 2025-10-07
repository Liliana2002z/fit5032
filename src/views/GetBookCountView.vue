<template>
  <div class="book-counter-container">
    <h1>Book Counter</h1>
    
    <button @click="getBookCount">Get Book Count</button>

    <p v-if="count !== null" class="success-message">
      Total number of books: <strong>{{ count }}</strong>
    </p>

    <p v-else-if="error" class="error-message">
      Error: {{ error }}
    </p>

    <p v-else class="status-message">
      Click the button to fetch the book count.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const FIREBASE_FUNCTION_URL = 'https://countbooks-ibmhkhju7a-uc.a.run.app'; 

const count = ref(null);
const error = ref(null);

const getBookCount = async () => {
    
    count.value = null;
    error.value = null;

    try {
        const response = await axios.get(FIREBASE_FUNCTION_URL);
        
        if (response.data && typeof response.data.count === 'number') {
            count.value = response.data.count;
        } else {
            
            throw new Error("Invalid response format from server.");
        }
        
    } catch (err) {
        console.error('Error fetching book count:', err);
        error.value = err.response 
            ? `Server Error: ${err.response.status}`
            : 'Could not reach the server. Check your function URL or CORS settings.';
    }
};
</script>

<style scoped>
.book-counter-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    text-align: center;
}

.book-counter-container button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
}

.success-message {
    color: #28a745;
    font-size: 1.2em;
}

.error-message {
    color: #dc3545;
    font-weight: bold;
}
</style>