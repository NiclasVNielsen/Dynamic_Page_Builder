<script setup>
const props = defineProps(['data'])
const data = props.data

//? Needed data
/* 
    Heading1: String
    Paragraph1: String
*/


</script>

<template>
    <div>
        <p class="editable">
            {{ data.Heading1 }}
        </p>
        <p class="editable">
            {{ data.Paragraph1 }}
        </p>
        <p class="editable">
            {{ data.Paragraph2 }}
        </p>
    </div>
    <br>
</template>