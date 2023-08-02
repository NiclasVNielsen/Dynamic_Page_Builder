<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/admin">AdminHome</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/about/admin">AdminAbout</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="sass">

*
  margin: 0
  padding: 0
  box-sizing: border-box

</style>
