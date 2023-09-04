<script setup>
const props = defineProps({
    data: 'array',
})
const data = props.data

//? Needed data
/* 
    Heading1: String
    Paragraph1: String
    Image1: String
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
        {{ data.image1 }}
        <img :src="'/test/' + data.image1" alt="" class="editable" data-field="image1">
        <br>
    </div>
</template>