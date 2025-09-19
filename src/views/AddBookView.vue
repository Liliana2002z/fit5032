<template>
  <div class="add-book-page">
    <div class="add-book-form">
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div class="form-group">
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
    
    <div class="book-list-display">
      <BookList />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '@/firebase/init';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '@/components/BookList.vue';

const isbn = ref('');
const name = ref('');

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value);
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number!');
      return;
    }
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    });
    alert('Book added successfully!');
    isbn.value = '';
    name.value = '';
  } catch (error) {
    console.error('Error adding book: ', error);
    alert('Failed to add book. Please try again.');
  }
};
</script>

<style scoped>
.add-book-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.add-book-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.add-book-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.add-book-form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-book-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.add-book-form button:hover {
  background-color: #0056b3;
}
</style>