<script setup>

import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const admin = ref(false)

if(route.params.admin == "admin"){
  admin.value = true
}

watch(route, () => {
  if(route.params.admin == "admin"){
    admin.value = true
  }else{
    admin.value = false
  }
})

</script>

<template>
  <main>
    <h1>Home</h1>
    <p>
      admin: {{ admin }}
    </p>
  </main>
</template>

<style scoped lang="sass">

</style>