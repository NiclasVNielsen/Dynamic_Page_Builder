<script setup>
const props = defineProps({
    data: 'array',
    index: 'number'
})
const data = props.data
const index = props.index

//? Needed data
/* 
    heading1: String
    paragraph1: String
*/


</script>

<template>
    <section class="wrapper" :class="'index' + index">
        <p>
            {{ index }}
        </p>
        <div>
            <p class="editable" data-field="heading1">
                {{ data.heading1 }}
            </p>
            <p class="editable" data-field="paragraph1">
                {{ data.paragraph1 }}
            </p>
        </div>
        <br>
    </section>
</template>

<style lang="sass" scoped>

section
    background: #eee

</style>