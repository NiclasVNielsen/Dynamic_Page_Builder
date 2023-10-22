<script setup>
import { createPage, deletePage } from '../../../database/main'
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
  nav: 'array',
  adminLinkExtention: 'string'
})
const nav = props.nav
let adminLinkExtention = props.adminLinkExtention

const addPage = async (e) => {
    e.preventDefault()
    
    const title = document.querySelector("#addPage").value
    await createPage(title, nav.template)
    router.push('/update')
}

const removePage = async (title) => {
    deletePage(title, nav.template)
    router.push('/update')
}

</script>

<template>
    <div class="filler"></div>
    <header>
        <div class="headerElement">
            <nav>
                <ul>
                    <li v-for="(path, index) in nav.paths" :key="nav.paths">
                        <RouterLink :to="path == '/' ? adminLinkExtention == '' ? '/' : adminLinkExtention : path + adminLinkExtention"> 
                            {{ nav.titles[index] }}
                        </RouterLink>
                        <template v-if="adminLinkExtention == '/admin'">
                            <p @click="removePage(nav.titles[index])">
                                🗑️
                            </p>
                        </template>
                    </li>
                    <template v-if="adminLinkExtention == '/admin'">
                        <li>
                            <input id="addPage" type="text" placeholder="New Page">
                            <button @click="addPage">+</button>
                        </li>
                    </template>
                </ul>
            </nav>
        </div>
        <div class="headerElement">
            <RouterLink to="/"> 
                Logo
            </RouterLink>
        </div>
        <div class="headerElement">
        </div>
    </header>
</template>

<style lang="sass" scoped>

.filler
    height: 66px

header
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 999
    display: flex
    align-items: center
    padding: 8px 64px
    border-bottom: 2px solid var(--thir)
    font-weight: bold
    background: #fff
    >.headerElement
        &:nth-of-type(2)
            margin: 0 32px
            width: 48px
            aspect-ratio: 1/1
            overflow: hidden
        &:first-of-type, &:last-of-type
            flex: 1
    
    ul
        list-style: none
        display: flex
        li
            margin-right: 15px
            display: flex
            align-items: center
            a    
                color: var(--prim)
                transition: 100ms
                &:hover
                    color: var(--seco)
            p
                cursor: pointer
                border-radius: 3px
                &:hover
                    background: #F00
        a
            text-decoration: none
            color: #000

</style>