<script setup>
const props = defineProps({
    data: 'array',
})
const data = props.data

//? Needed data
/* 
    heading1
    paragraph1
*/


</script>

<template>
    <div class="box">
        <h2 class="editable" data-field="heading1">
            {{ data.heading1 }}
        </h2>
        <p class="editable" data-field="paragraph1">
            {{ data.paragraph1 }}
        </p>
        <br>
    </div>
</template>

<style lang="sass" scoped>

h2
    margin-bottom: 24px

h2, p
    max-width: 768px
    text-align: center
    margin-left: auto
    margin-right: auto

</style>