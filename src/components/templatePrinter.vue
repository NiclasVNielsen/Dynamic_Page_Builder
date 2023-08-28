<script setup>
/* Names could be
  hero1.vue
  hero2.vue
  infoSec1.vue
  infoSec2.vue
  infoSec3.vue
*/

import { reOrderContentForPage, deleteContentForPage } from '../database/main';

import userNav from './templates/navigations/userNav.vue';

import tem1 from './templates/1.vue';
import tem2 from './templates/2.vue';

const startingIndex = document.querySelectorAll(".wrapper").length

const props = defineProps({
  data: 'array',
  nav: 'array',
  ale: 'String'
})
let dataset = props.data
let nav = props.nav[0]
let ale = props.ale

</script>

<!-- 
  This is essentially a component router.
  How to make your own:

  <template v-if="data.template == X">
    <Y :data = "data"/>
  </template>

  X = The name of the template in your database
  Y = The name of the template in your "templates" folder
-->
<template>

  <template v-if="nav.template == 'userNav'">
    <userNav :nav = "nav" :adminLinkExtention = "ale"/>
  </template>

  <template v-for="(data, index) in dataset" :key="data">
    <section class="wrapper" :class="'index' + (index + startingIndex)">
      <div class="controlPanel" v-if="ale == '/admin'">
        <p @click="reOrderContentForPage(index, data.page, 'up')">^</p>
        <p @click="deleteContentForPage(index, data.page)">X</p>
        <p @click="reOrderContentForPage(index, data.page, 'down')">v</p>
      </div>

      <template v-if="data.template == 1">
        <tem1 :data = "data"/>
      </template>

      <template v-if="data.template == 2">
        <tem2 :data = "data"/>
      </template>
    </section>
  </template>
</template>

<style scoped lang="sass">

.wrapper
  position: relative
  &:hover
    .controlPanel
      opacity: 1

.controlPanel
  position: absolute
  right: 0
  top: 50%
  transform: translateY(-50%)
  opacity: 0
  transition: 150ms
  padding: 10px
  border-radius: 20px
  background: #fff
  box-shadow: 0px 0px 10px -5px #000
  text-align: center
  p
    cursor: pointer
  &:hover
    opacity: 1

</style>