<script setup>
const props = defineProps({
    data: 'array',
    index: 'number'
})
const data = props.data
const index = props.index

//? Needed data
/* 
    Heading1: String
    Paragraph1: String
    Paragraph2: String
*/

</script>

<template>
    <section class="wrapper" :class="'index' + index">
        <div>
            {{ index }}
            <p class="editable" data-field="heading1">
                {{ data.heading1 }}
            </p>
            <p class="editable" data-field="paragraph1">
                {{ data.paragraph1 }}
            </p>
            <p class="editable" data-field="paragraph2">
                {{ data.paragraph2 }}
            </p>
        </div>
        <br>
    </section>
</template>