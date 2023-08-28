<script setup>
const props = defineProps({
    data: 'array',
})
const data = props.data

//? Needed data
/* 
    heading1: String
    paragraph1: String
*/


</script>

<template>
    <div>
        {{ data.order }}
        <p class="editable" data-field="heading1">
            {{ data.heading1 }}
        </p>
        <p class="editable" data-field="paragraph1">
            {{ data.paragraph1 }}
        </p>
        <br>
    </div>
</template>

<style lang="sass" scoped>

div
    background: #eee

</style>