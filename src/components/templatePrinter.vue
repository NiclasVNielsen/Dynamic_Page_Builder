<script setup>
import tem1 from './templates/1.vue';

const props = defineProps(['data'])
const dataset = props.data

/* console.log(dataset[0].template) */


</script>

<template>
  <template v-for="data in dataset" :key="data">
    <tem1 :data = "data"/>
  </template>
</template>