<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style lang="sass">

*
  margin: 0
  padding: 0
  box-sizing: border-box

</style>
