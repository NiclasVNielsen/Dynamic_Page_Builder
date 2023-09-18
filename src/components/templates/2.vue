<script setup>
const props = defineProps({
    data: 'array',
})
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
        <p class="editable" data-field="heading1">
            {{ data.heading1 }}
        </p>
        <p class="editable" data-field="paragraph1">
            {{ data.paragraph1 }}
        </p>
        <p class="editable" data-field="paragraph2">
            {{ data.paragraph2 }}
        </p>
        <br>
    </div>
</template>