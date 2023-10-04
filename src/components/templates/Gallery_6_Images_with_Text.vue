<script setup>
const props = defineProps({
    data: 'array',
})
const data = props.data

//? Needed data
/* 
    heading1
    paragraph1
    image1
    image1Heading
    image1Paragraph
    image2
    image2Heading
    image2Paragraph
    image3
    image3Heading
    image3Paragraph
    image4
    image4Heading
    image4Paragraph
    image5
    image5Heading
    image5Paragraph
    image6
    image6Heading
    image6Paragraph
*/


</script>

<template>
    <div class="box">
        <div class="title">
            <h3 class="editable" data-field="heading1">
                {{ data.heading1 }}
            </h3>
            <p class="editable" data-field="paragraph1">
                {{ data.paragraph1 }}
            </p>
        </div>
        <section>
            <div class="image">
                <img :src="data.image1" alt="Empty image" class="editable" data-field="image1">
                <h4 class="editable" data-field="image1Heading">
                    {{ data.image1Heading }}
                </h4>
                <p class="editable" data-field="image1Paragraph">
                    {{ data.image1Paragraph }}
                </p>
            </div>
            <div class="image">
                <img :src="data.image2" alt="Empty image" class="editable" data-field="image2">
                <h4 class="editable" data-field="image2Heading">
                    {{ data.image2Heading }}
                </h4>
                <p class="editable" data-field="image2Paragraph">
                    {{ data.image2Paragraph }}
                </p>
            </div>
            <div class="image">
                <img :src="data.image3" alt="Empty image" class="editable" data-field="image3">
                <h4 class="editable" data-field="image3Heading">
                    {{ data.image3Heading }}
                </h4>
                <p class="editable" data-field="image3Paragraph">
                    {{ data.image3Paragraph }}
                </p>
            </div>
        </section>
        <section>
            <div class="image">
                <img :src="data.image4" alt="Empty image" class="editable" data-field="image4">
                <h4 class="editable" data-field="image4Heading">
                    {{ data.image4Heading }}
                </h4>
                <p class="editable" data-field="image4Paragraph">
                    {{ data.image4Paragraph }}
                </p>
            </div>
            <div class="image">
                <img :src="data.image5" alt="Empty image" class="editable" data-field="image5">
                <h4 class="editable" data-field="image5Heading">
                    {{ data.image5Heading }}
                </h4>
                <p class="editable" data-field="image5Paragraph">
                    {{ data.image5Paragraph }}
                </p>
            </div>
            <div class="image">
                <img :src="data.image6" alt="Empty image" class="editable" data-field="image6">
                <h4 class="editable" data-field="image6Heading">
                    {{ data.image6Heading }}
                </h4>
                <p class="editable" data-field="image6Paragraph">
                    {{ data.image6Paragraph }}
                </p>
            </div>
        </section>
        <br>
    </div>
</template>

<style lang="sass" scoped>

.title
    margin-bottom: 80px

h4
    font-size: 20px
    margin-bottom: 16px

h3, p
    max-width: 768px

section
    display: flex
    justify-content: space-between
    &:first-of-type
        margin-bottom: 64px
    > .image
        margin-right: 32px
        &:last-of-type
            margin-right: 0px

</style>