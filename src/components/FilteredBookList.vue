<template>
  <div>
    <h1>Filtered Books</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
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
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';

const books = ref([]);

const fetchFilteredBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'desc'),
      limit(5)
    );
    
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
    console.error('Error fetching filtered books: ', error);
  }
};

onMounted(() => {
  fetchFilteredBooks();
});


defineExpose({
  fetchFilteredBooks
});
</script>