<script setup>
/* Names could be
  hero1.vue
  hero2.vue
  infoSec1.vue
  infoSec2.vue
  infoSec3.vue
*/
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
    <template v-if="data.template == 1">
      <tem1 :data = "data" :index = "index + startingIndex"/>
    </template>

    <template v-if="data.template == 2">
      <tem2 :data = "data" :index = "index + startingIndex"/>
    </template>

  </template>
</template>
