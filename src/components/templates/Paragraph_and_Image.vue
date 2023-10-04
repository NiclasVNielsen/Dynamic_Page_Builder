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
*/


</script>

<template>
    <div class="box">
        <div class="text">
            <h3 class="editable" data-field="heading1">
                {{ data.heading1 }}
            </h3>
            <p class="editable" data-field="paragraph1">
                {{ data.paragraph1 }}
            </p>
        </div>
        <div class="image">
            <img :src="data.image1" alt="Empty image" class="editable" data-field="image1">
        </div>
    </div>
</template>

<style lang="sass" scoped>

.box
    display: flex
    align-items: center
    > div
        width: 50%
    .text
        padding-right: 80px
        h3
            font-size: 56px
            margin-bottom: 24px
        p
            font-size: 18px

</style>