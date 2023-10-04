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
import { useRouter } from 'vue-router'

import Footer from './templates/Footer.vue';
import Paragraph_and_Image from './templates/Paragraph_and_Image.vue';
import Image_and_Paragraph from './templates/Image_and_Paragraph.vue';
import Paragraph_Left_Aligned from './templates/Paragraph_Left_Aligned.vue';
import Paragraph_Centered from './templates/Paragraph_Centered.vue';
import Gallery_3_Images from './templates/Gallery_3_Images.vue';
import Gallery_4_Images from './templates/Gallery_4_Images.vue';
import Gallery_6_Images from './templates/Gallery_6_Images.vue';
import Gallery_6_Images_with_Text from './templates/Gallery_6_Images_with_Text.vue';


const router = useRouter()

const startingIndex = document.querySelectorAll(".wrapper").length

const props = defineProps({
  data: 'array',
  nav: 'array',
  ale: 'String'
})
let dataset = props.data
let nav = props.nav[0]
let ale = props.ale



function convertHTML(str) { //* credits: https://forum.freecodecamp.org/t/convert-html-entities/595351
  str = `${str}` //? converts numbers to string

  const symbols = {
    "<div>": "<br>",
    "</div>": "",
    "<script": "No you don't"
  }
  for (const symbol in symbols) {
    if (str.indexOf(symbol) >= 0) {
      str = str.replaceAll(symbol, symbols[symbol])
    }
  }
  /* const symbols = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",
    "&apos;": "'"
  }
  for (const symbol in symbols) {
    if (str.indexOf(symbol) >= 0) {
      const newStr = str.replaceAll(symbol, symbols[symbol])
      return newStr
    }
  } */
  return str;
}

//? convert html entities
for(let i = 0; i < dataset.length; i++){
  const keys = Object.keys(dataset[i]);
  keys.forEach(key => {
    const newValue = convertHTML(dataset[i][key])
    dataset[i][key] = newValue
  })

}



const deleteSection = async (index, page) => {
  await deleteContentForPage(index, page)
  router.push('/update')
}

const changeOrder = async (index, page, direction) => {
  await reOrderContentForPage(index, page, direction)
  router.push('/update')
}

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
        <p @click="changeOrder(index, data.page, 'up')">^</p>
        <p @click="deleteSection(index, data.page)">X</p>
        <p @click="changeOrder(index, data.page, 'down')">v</p>
      </div>
      

      <template v-if="data.template == 1">
        <Paragraph_and_Image :data = "data"/>
      </template>

      <template v-if="data.template == 2">
        <Image_and_Paragraph :data = "data"/>
      </template>

      <template v-if="data.template == 3">
        <Paragraph_Left_Aligned :data = "data"/>
      </template>

      <template v-if="data.template == 4">
        <Paragraph_Centered :data = "data"/>
      </template>

      <template v-if="data.template == 5">
        <Gallery_3_Images :data = "data"/>
      </template>

      <template v-if="data.template == 6">
        <Gallery_4_Images :data = "data"/>
      </template>

      <template v-if="data.template == 7">
        <Gallery_6_Images :data = "data"/>
      </template>

      <template v-if="data.template == 8">
        <Gallery_6_Images_with_Text :data = "data"/>
      </template>

      <template v-if="data.template == 9">
        <Footer :data = "data"/>
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