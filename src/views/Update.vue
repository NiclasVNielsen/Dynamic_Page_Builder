<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()



watch(route, async () => {
    if(route.path == "/update"){
        router.go(-1)
    }
})

</script>

<template>
    <div>
        Updating!...
    </div>
</template>