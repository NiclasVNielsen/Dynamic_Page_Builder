<script setup>

import { useRouter } from 'vue-router'
import uploadImage from './uploadImage.vue';
import { default as deleteImage } from './deleteImage.js';
import { default as getAllImages } from '../views/Modules/getAllImages'
import { ref } from 'vue';

const router = useRouter()

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

const prepareImageDelete = (url) => {
    //? Url
    //? Start: https://firebasestorage.googleapis.com/v0/b/asoap-bbc58.appspot.com/o/65914833361640744.jpg?alt=media&token=790bad1b-2a76-446d-8999-f6fc19bb1f64
    //? End  : 65914833361640744.jpg
    const temp = url.split('/')
    url = temp[temp.length-1]
    url = url.split('?')[0]

    deleteImage(url, router)
}

</script>



<template>
    <section>
        <div class="upload" @click="upload = true">
            <uploadImage/>
        </div>
        <div class="imageContainer" v-for="image in images" :key="images[0]">
            <div class="images" @click="updateImage(image)">
                <img :src="image" alt="Ohh no, image not found :sadEmoji:">
            </div>
            <div class="delete" @click="prepareImageDelete(image)">
                Delete Image
            </div>
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
    .imageContainer
        cursor: pointer
        width: 48%
        background: #fff
        border-radius: 5px
        overflow: hidden
        margin: 0 1%
        margin-bottom: 10px
        .images
            aspect-ratio: 1/1
            display: flex
            align-items: center
            justify-content: center
            background: #eee
            overflow: hidden
            transition: 50ms
            filter: grayscale(50%)
            &:hover
                filter: grayscale(0%)
            img
                width: 100%
                height: auto
                display: block
        .delete
            padding: 5px
            transition: 50ms
            &:hover
                background: #f99

</style>