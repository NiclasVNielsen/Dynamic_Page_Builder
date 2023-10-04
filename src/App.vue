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
  font-family: Roboto, sans-serif

img
  width: 100%
  height: auto
  display: block

.box
  padding: 112px 64px
  width: 100%
  max-width: 1312px
  margin: 0 auto


h1,h2,h3,h4,h5,h6
  font-size: 56px

p
  font-size: 18px

</style>
