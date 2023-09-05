<script setup>

import uploadImage from './uploadImage.vue';
import { default as getAllImages } from '../views/Modules/getAllImages'
import { ref } from 'vue';



const props = defineProps({
  data: 'Number'
})
let imageIndex = props.data


const images = ref([])

const getImages = async () => {
    const response = await getAllImages()
    images.value = response
}

getImages()


const updateImage = (image) => {
    const images = document.querySelectorAll("img.editable")
    images[imageIndex].src = image
}

</script>



<template>
    <section>
        <div class="upload" @click="upload = true">
            <uploadImage/>
        </div>
        <div class="images" v-for="image in images" :key="images[0]" @click="updateImage(image)">
            <img :src="image" alt="Ohh no, image not found :sadEmoji:">
        </div>
    </section>
</template>



<style scoped lang="sass">

section
    display: flex
    flex-wrap: wrap
    .upload
        width: 100%
        height: 10vh
        display: flex
        align-items: center
        justify-content: center
        text-decoration: underline
        transition: 150ms
        cursor: pointer
        &:hover
            background: #f5f5f5
            color: #333
    .images
        width: 50%
        aspect-ratio: 1/1
        display: flex
        align-items: center
        justify-content: center
        background: #eee
        overflow: hidden
        img
            width: 100%
            height: auto
            display: block

</style>