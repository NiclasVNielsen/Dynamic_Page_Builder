<script setup>
//* Imports and basic setup
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

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
console.log(route.path)

const title = ref(route.path)

const findPageTitle = () => {
    title.value = route.path
    if(title.value.includes("admin")){
        title.value = title.value.slice(0, -6)
        if(title.value == ""){
            title.value = "/"
        }
    }
}

findPageTitle()

watch(route, () => {
    findPageTitle()
})
//?------------------



const data = ref([
  {
    template: 1,
    title: "hero",
    content1: "Actual Story of Actual Play",
    order: 1
  }
])

</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p>
      admin: {{ admin }}
    </p>
  </main>
</template>

<style scoped lang="sass">

</style>