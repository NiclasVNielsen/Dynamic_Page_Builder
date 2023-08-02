<script setup>
//* Imports and basic setup
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import templatePrinter from '../components/templatePrinter.vue';

const route = useRoute()
//*------------------



//? Admin Page
//* Handles the differences between admin and non-admin pages
const admin = ref(false)

//* Checks if the page is set to admin mode
const adminPageCheck = () => {
    if(route.params.admin == "admin"){
        admin.value = true
    }else{
        admin.value = false
    }
}

//* Runs a check to see if we are currently on an admin page
adminPageCheck()

//* Updates the page if we switch to an admin page
watch(route, () => {
    adminPageCheck()
})
//?------------------



//? Find Page Title
//* Distinguish the page you are currently on
const title = ref(route.path)

const findPageTitle = () => {
    //* Updates the title
    title.value = route.path
    
    if(title.value.includes("admin")){
        //* Cuts of the "/admin" from the string
        title.value = title.value.slice(0, -6)

        //* "/admin" would give "" instead of "/"
        if(title.value == ""){
            title.value = "/"
        }
    }
}

//* Calls "findPageTitle" on page load
findPageTitle()

//* Calls "findPageTitle" when you redirect using vue's routerLinks
watch(route, () => {
    findPageTitle()
})
//?------------------


//? Load Data

//* find data where titles match (SELECT data WHERE title = title.value)

//! Test Data
const data = ref([
  {
    template: 1, /* Decides the template you use */
    title: "/",
    Heading1: "Actual Story of Actual Play",
    Paragraph1: "Smiiiips",
    order: 1
  },
  {
    template: 1, /* Decides the template you use */
    title: "/",
    Heading1: "Smush dush",
    Paragraph1: "Smuuuuuups",
    order: 2
  }
])
//?------------------



</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p>
      admin: {{ admin }}
    </p>
    <templatePrinter :data = "data" />
  </main>
</template>

<style scoped lang="sass">

</style>