<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../database/config.js'

initializeApp(firebaseConfig);

const router = useRouter()

const email = ref("")
const password = ref("")

const login = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
        /* Wohooo you logged in! */
        router.push('/')
    })
    .catch(() => {
        console.log("Something went wrong Scally!")
    })
}

</script>

<template>
    <h1>
        Admin Login
    </h1>
    <p>
        <input type="text" placeholder="Email!" v-model="email">
    </p>
    <p>
        <input type="password" placeholder="Password!" v-model="password">
    </p>
    <p @click="login">
        Login!
    </p>
</template>