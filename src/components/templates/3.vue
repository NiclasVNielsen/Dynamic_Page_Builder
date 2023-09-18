<script setup>
const props = defineProps({
    data: 'array',
})
const data = props.data

//? Needed data
/* 
    Heading1: String
    Paragraph1: String
    Image1: String
*/

</script>



<template>
    <div>
        <p class="editable" data-field="heading1">
            {{ data.heading1 }}
        </p>
        <p class="editable" data-field="paragraph1">
            {{ data.paragraph1 }}
        </p>
        <img :src="data.image1" alt="Empty image" class="editable" data-field="image1">
        <br>
    </div>
</template>



<style lang="sass" scoped>

img
    width: 200px

</style>