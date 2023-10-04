<script setup>
const props = defineProps({
    data: 'array',
})
const data = props.data

//? Needed data
/* 
    heading1
    paragraph1
    image1
    image2
    image3
    image4
*/


</script>

<template>
    <div class="box">
        <h3 class="editable" data-field="heading1">
            {{ data.heading1 }}
        </h3>
        <p class="editable" data-field="paragraph1">
            {{ data.paragraph1 }}
        </p>
        <section>
            <div class="image">
                <img :src="data.image1" alt="Empty image" class="editable" data-field="image1">
            </div>
            <div class="image">
                <img :src="data.image2" alt="Empty image" class="editable" data-field="image2">
            </div>
            <div class="image">
                <img :src="data.image3" alt="Empty image" class="editable" data-field="image3">
            </div>
            <div class="image">
                <img :src="data.image4" alt="Empty image" class="editable" data-field="image4">
            </div>
        </section>
        <br>
    </div>
</template>

<style lang="sass" scoped>

h3
    margin-bottom: 24px

p
    margin-bottom: 80px

h3, p
    max-width: 768px
    text-align: center
    margin-left: auto
    margin-right: auto

section
    display: flex
    justify-content: space-between
    > .image
        margin-right: 32px
        &:last-of-type
            margin-right: 0px

</style>