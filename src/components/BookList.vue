<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="handleUpdate(book.id)">Update</button>
        <button @click="handleDelete(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue';
import { db } from '@/firebase/init';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';

const books = ref([]);

const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000));
    const querySnapshot = await getDocs(q);
    const booksArray = [];
    querySnapshot.forEach((doc) => {
      booksArray.push({
        id: doc.id,
        ...doc.data()
      });
    });
    books.value = booksArray;
  } catch (error) {
    console.error('Error fetching books: ', error);
  }
};

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this book?')) {
    try {
      await deleteDoc(doc(db, 'books', id));
      alert('Book deleted successfully!');
      fetchBooks(); 
    } catch (error) {
      console.error('Error deleting book: ', error);
      alert('Failed to delete book.');
    }
  }
};

const handleUpdate = async (id) => {
  try {
    const newName = prompt('Enter a new name for the book:');
    if (newName) {
      const bookRef = doc(db, 'books', id);
      await updateDoc(bookRef, {
        name: newName
      });
      alert('Book updated successfully!');
      fetchBooks(); 
    }
  } catch (error) {
    console.error('Error updating book: ', error);
    alert('Failed to update book.');
  }
};

onMounted(() => {
  fetchBooks();
});


defineExpose({
  fetchBooks
});
</script>