<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <ul>
          <li><RouterLink to="/">Home </RouterLink></li>
          <li><RouterLink to="/admin">AdminHome </RouterLink></li>
          <li><RouterLink to="/about">About </RouterLink></li>
          <li><RouterLink to="/about/admin">AdminAbout </RouterLink></li>
        </ul>
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
