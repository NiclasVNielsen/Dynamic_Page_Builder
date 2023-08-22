<script setup>
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router";

const auth = getAuth()
const router = useRouter()

signOut(auth).then(() => {
    router.push('/')
})

</script>

<template>
    <div>
        Log out page!
    </div>
</template>