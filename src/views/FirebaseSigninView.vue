<template>
	<div class="login-container">
		<h1>Signin</h1>
		<form @submit.prevent="signin">
			<p>
				<input type="email" placeholder="Email" v-model="email" />
			</p>
			<p>
				<input type="password" placeholder="Password" v-model="password" />
			</p>
			<p>
				<button type="submit">Sign In via Firebase</button>
			</p>
		</form>
		<div v-if="error" class="error">{{ error }}</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();

const auth = getAuth();

const signin = () => {
	error.value = null; // Clear previous errors
	signInWithEmailAndPassword(auth, email.value, password.value)
		.then((userCredential) => { // Accept the userCredential object
			// Signin successful, redirect to home page
			console.log("Firebase Sign-in Successful!");
			console.log(userCredential.user); // Correctly logs the user object
			router.push('/'); // Redirect after successful login
		})
		.catch((err) => {
			error.value = 'Invalid email or password.';
			console.error(err.code);
		});
};
</script>

<style scoped>
.login-container {
	max-width: 400px;
	margin: 50px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: #f9f9f9;
	text-align: center;
}
.login-container input{
	width: 100%;
	padding: 8px;
	margin-bottom: 10px;
	box-sizing: border-box;
} 
.error {
	color: red;
	margin-top: 10px;
}
</style>