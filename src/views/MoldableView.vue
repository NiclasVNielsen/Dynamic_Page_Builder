<script setup>
//* Imports and basic setup
import { onUpdated, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import templatePrinter from '../components/templatePrinter.vue';
import imageLibrary from '../components/imageLibrary.vue';
import { getAuth } from "firebase/auth"
import { default as templateIndex } from '../components/templateIndex';

import { default as adminCheck } from './Modules/adminPageCheck'
import { default as findTitle } from './Modules/findPageTitle'
import { default as adminModeToggle } from './Modules/adminModeToggle'
import { default as getContent } from './Modules/getContent'
import { default as submitAdminUpdate } from './Modules/submitAdminUpdate'
import { default as getNewSectionData } from './Modules/getNewSectionData'
import { default as convertLinks } from './Modules/linkConverter'

const route = useRoute()
const vueRouter = useRouter()
const auth = getAuth()
const adminPage = ref(false)
//*------------------


//? Image selection
const selectedImage = ref(null)

const selectImage = () => {
    const images = document.querySelectorAll("img.editable")
    images.forEach((image, index) => {
        image.addEventListener("click", () => {
            selectedImage.value = index
        })
    })
}

//?------------------



//? Checks if on Admin Page
//* Handles the differences between admin and non-admin pages
const admin = ref(false)
const adminLink = ref("/admin")

//* Checks if the page is set to admin mode
const adminPageCheck = async () => {
    admin.value = await adminCheck()
}

//* Runs a check to see if we are currently on an admin page
await adminPageCheck()

//?------------------



//? Find Page Title
//* Distinguish the page you are currently on
const title = ref(route.path)

const findPageTitle = async () => {
    title.value = await findTitle(route)
}

//* Calls "findPageTitle" on page load
await findPageTitle()

//?------------------



//? Setup Admin Panel
//* Makes text fields editable
const adminLinkExtention = ref("Loading")


const isAdminPage = () => {
    let result = false

    let path = route.path.split('/')
    path = path[path.length - 1]
    if(path == 'admin'){
        result = true
    }

    adminPage.value = result
}

const updateAdminStatus = async (condition = null, link = adminLink.value) => {
    if(condition == null){
        isAdminPage()
        condition = adminPage.value
    }
    const response = await adminModeToggle(condition, link)
    adminLinkExtention.value = response.adminLinkExtention
    adminLink.value = response.adminLink
    
    selectImage()
}

//?------------------



//? Load Data
const data = ref("loading")
const navigation = ref("loading")

const loadContent = async () => {
    const response = await getContent(title.value, navigation.value)
    data.value = response.data
    navigation.value = response.navigation
    
    //? setTimeout is just to make async
    setTimeout(() => {
        if(adminPage.value == false){
            convertLinks()
        }
    }, 0);
}
loadContent()

//?------------------



//? Update Page

await updateAdminStatus()

watch(route, async () => {
    if(route.path == "/update"){
        vueRouter.go(-1)
    }

    findPageTitle()
    await findPageTitle()
    loadContent()
    newSection.value = false
})

onUpdated(async () => {
    adminPageCheck()
    await updateAdminStatus()
})

const adminUpdateSubmit = async () => {
    const response = await submitAdminUpdate(vueRouter, title.value, newSectionData.value)
    if(response == "Success!"){
        console.log("Success!") //! Popup message!
    }
}

//?------------------



//? Create new section
const newSection = ref(false)

const newSectionData = ref([])
const selectedTemplate = ref(1)

const populateNewSectionData = async (templateId) => {
    const response = await getNewSectionData(templateId)
    newSectionData.value = [response]
}

//?------------------



//? Log out
const logout = () => {
    vueRouter.push('/logout')
}

//?------------------



//? closeImageLibrary
const closeImageLibrary = (e) => {
    e.stopPropagation();

    const imageLibraryBar = document.querySelector("#imageLibrary")
    imageLibraryBar.style.display = "none"
}

//?------------------


</script>



<template>
  <main>
    <template v-if="auth.currentUser"><!-- if logged in as an admin -->
        <div id="adminOverload">
            <nav>
                <div class="adminToggle">
                    <RouterLink :to="adminLink">Admin</RouterLink>
                    <template v-if="!adminPage"> <!-- if not admin -->
                        <div class="toggle off"></div>
                    </template>
                    <template v-else> <!-- if admin -->
                        <div class="toggle on"></div>
                    </template>
                </div>
                <p class="email">
                    {{ auth.currentUser.email }}
                </p>
                <p @click="logout" class="logout">
                    Log out!
                </p>
            </nav>
            <div class="adminSubmit" @click="adminUpdateSubmit" v-if="adminPage">
                Update!
            </div>
        </div>
    </template>



    <templatePrinter v-if="data != 'loading' && navigation != 'loading' && adminLinkExtention != 'loading'" :key="data + navigation + adminLinkExtention" :data="data" :nav="navigation" :ale="adminLinkExtention"/>
    <div v-else>
        Loading!
    </div>



    <template v-if="adminPage && auth.currentUser">
        <div v-if="newSection == false" class="addNewSectionField" @click="newSection = true; populateNewSectionData(selectedTemplate)">
            <figure>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </figure>
        </div>
        <div v-else>
            <div>
                <select v-model="selectedTemplate" @change="populateNewSectionData(selectedTemplate)">
                    <template v-for="template in templateIndex" :key="templateIndex">
                        <option :value="template.templateId">{{ template.name }}</option>
                    </template>
                </select>
            </div>
            <templatePrinter :key="newSectionData[0].template" :data="newSectionData" :nav="['noNav']" ale="noAle"/>
        </div>

        <div id="imageLibrary" style="display: none;">
            <div @click="closeImageLibrary"></div>
            <aside>
                <imageLibrary :key="selectedImage" :data="selectedImage"/>
            </aside>
        </div>
    </template>


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
        background: #bbb
        border: solid 2px #ccc
        box-sizing: border-box

.addNewSectionField
    height: 120px
    margin-bottom: 200px
    background: #eee
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    transition: 100ms
    &:hover
        background: #f3f3f3
        svg
            fill: #f3f3f3
    figure
        background: #FFF
        width: 90px
        height: 90px
        border-radius: 50%
        display: flex
        align-items: center
        justify-content: center
        fill: #eee
        svg
            height: 75%

#adminOverload
    nav
        z-index: 10000
        position: fixed
        top: 0
        right: 0
        .adminToggle
            display: flex
            align-items: center
            justify-content: flex-end
            a
                margin-right: .5em
    .adminSubmit
        position: fixed
        bottom: 1em
        right: 1em
        cursor: pointer

#imageLibrary
    height: 100vh
    width: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 10001
    justify-content: flex-end
    aside
        height: 100vh
        width: 100%
        max-width: 400px
        background: #eee
    >div
        height: 100vh
        flex: 1

</style>