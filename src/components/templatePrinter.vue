<script setup>
import tem1 from './templates/1.vue';
import tem2 from './templates/2.vue';

const props = defineProps(['data'])
const dataset = props.data

</script>

<template>
  <template v-for="data in dataset" :key="data">

    <template v-if="data.template == 1">
      <tem1 :data = "data"/>
    </template>

    <template v-if="data.template == 2">
      <tem2 :data = "data"/>
    </template>
    
  </template>
</template>