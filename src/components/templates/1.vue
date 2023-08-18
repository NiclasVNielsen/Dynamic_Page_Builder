<script setup>
const props = defineProps(['data'])
const data = props.data

//? Needed data
/* 
    heading1: String
    paragraph1: String
*/


</script>

<template>
    <section>
        <div>
            <p class="editable">
                {{ data.heading1 }}
            </p>
            <p class="editable">
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