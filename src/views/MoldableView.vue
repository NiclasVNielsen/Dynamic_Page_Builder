<script setup>
//* Imports and basic setup
import { onUpdated, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import templatePrinter from '../components/templatePrinter.vue';
import { getContent, getContentForPage } from '../Database/main';

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

//?------------------



//? Setup Admin Panel
//* Makes text fields editable
const adminModeToggle = (condition) => {
    if(condition){
        turnOnAdminMode()
    }else{
        turnOffAdminMode()
    }
}

const turnOnAdminMode = () => {
    const fields = document.querySelectorAll(".editable")
    fields.forEach(field => {
        field.outerHTML = field.outerHTML.replace('class="editable"', 'class="editable" contenteditable')
    })
}
const turnOffAdminMode = () => {
    const fields = document.querySelectorAll(".editable")
    fields.forEach(field => {
        field.outerHTML = field.outerHTML.replace('class="editable" contenteditable', 'class="editable"')
    })
}

//?------------------



//? Load Data
const data = ref([])

const loadContent = () => {
    data.value = []
    getContentForPage(title.value)
    .then(content => {
        data.value = content
    })
}
loadContent()

//?------------------



watch(route, () => {
    findPageTitle()
    loadContent()                                   
})

onUpdated(() => {
    adminPageCheck()
    adminModeToggle(route.params.admin == "admin")
})
</script>

<template>
  <main>
    <templatePrinter :key="data" :data = "data" />
  </main>
</template>

<style scoped lang="sass">

</style>