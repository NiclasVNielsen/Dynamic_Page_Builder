<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()



watch(route, async () => {
    console.log(route.path)
    if(route.path == "/update"){
        console.log("Go -1")
        
        router.go(-1)
    }
})

</script>

<template>
    <div>
        Updating!...
    </div>
</template>