<template>
	<div class="registration-form">
		<h1>Create an Account</h1>
		<p>
			<input type="email" placeholder="Email" v-model="email" />
		</p>
		<p>
			<input type="password" placeholder="Password" v-model="password" />
		</p>
		<p>
			<button @click="register">Save to Firebase</button>
		</p>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const register = () => {
	createUserWithEmailAndPassword(auth, email.value, password.value)
		.then((data) => {
			console.log("Firebase Register Successful!");
			router.push("/FireLogin");
		})
		.catch((error) => {
			console.log(error.code);
		});
};
</script>

<style scoped>
.registration-form {
	max-width: 400px;
	margin: 50px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: #f9f9f9;
	text-align: center;
}
.registration-form input {
	width: 100%;
	padding: 8px;
	margin-bottom: 10px;
	box-sizing: border-box;
}
</style>