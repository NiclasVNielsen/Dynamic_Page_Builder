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
        <p>
            {{ data.Heading1 }}
        </p>
        <p>
            {{ data.Paragraph1 }}
        </p>
    </div>
</template>