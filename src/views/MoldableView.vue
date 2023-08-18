<script setup>
//* Imports and basic setup
import { onUpdated, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import templatePrinter from '../components/templatePrinter.vue';
import { getContent, getContentForPage, getNavigationForPage } from '../Database/main';

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
const adminLinkExtention = ref("Loading")

const adminModeToggle = (condition) => {
    if(condition){
        turnOnAdminMode()
    }else{
        turnOffAdminMode()
    }
}

const turnOnAdminMode = () => {
    route.path == "/admin" ? adminLink.value = "/" : adminLink.value = route.path.slice(0, -6)

    const fields = document.querySelectorAll(".editable")
    fields.forEach(field => {
        field.outerHTML = field.outerHTML.replace('class="editable"', 'class="editable" contenteditable')
    })

    adminLinkExtention.value = "/admin"
}
const turnOffAdminMode = () => {
    route.path == "/" ? adminLink.value = "/admin" : adminLink.value = route.path + "/admin"

    const fields = document.querySelectorAll(".editable")
    fields.forEach(field => {
        field.outerHTML = field.outerHTML.replace('class="editable" contenteditable', 'class="editable"')
    })

    adminLinkExtention.value = ""
}

//?------------------



//? Load Data
const data = ref("loading")
const navigation = ref("loading")

const loadContent = () => {
    data.value = []
    getContentForPage(title.value)
    .then(content => {
        data.value = content
    })
    getNavigationForPage(title.value)
    .then(nav => {
        if(typeof nav == "string"){
            console.log(nav)
        }else{
            navigation.value = nav
        }
    })
}
loadContent()

//?------------------

const adminLink = ref("/admin")

adminModeToggle(route.params.admin == "admin")

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
    <nav id="adminUI"><!-- if logged in as an admin -->
        <li><RouterLink :to="adminLink">Admin</RouterLink></li>
        <template v-if="route.params.admin != 'admin'"> <!-- if not admin -->
            <div class="toggle off"></div>
        </template>
        <template v-else> <!-- if admin -->
            <div class="toggle on"></div>
        </template>
    </nav>
    <p>
        This:
        {{ adminLinkExtention }}
    </p>
    <templatePrinter v-if="data != 'loading' && navigation != 'loading' && adminLinkExtention != 'loading'" :key="data + navigation + adminLinkExtention" :data="data" :nav="navigation" :ale="adminLinkExtention"/>
    <div v-else>
        Loading!
    </div>

  </main>
</template>

<style scoped lang="sass">

.toggle
    height: 20px
    width: 28px
    border-radius: 10px
    position: relative
    &.on
        background: #3F3
        &::after
            margin-left: 1px
            right: 0
    &.off
        background: #F33
        &::after
            margin-left: -1px
    &::after
        content: ""
        display: block
        position: absolute
        top: 50%
        transform: translateY(-50%)
        width: 20px
        height: 20px
        border-radius: 10px
        background: #ccc

</style>