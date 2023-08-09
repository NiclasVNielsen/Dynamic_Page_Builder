<script setup>
const props = defineProps(['data'])
const data = props.data

//? Needed data
/* 
    Heading1: String
    Paragraph1: String
    Paragraph2: String
*/


</script>

<template>
    <div>
        <p class="editable">
            {{ data.heading1 }}
        </p>
        <p class="editable">
            {{ data.paragraph1 }}
        </p>
        <p class="editable">
            {{ data.paragraph2 }}
        </p>
    </div>
    <br>
</template>