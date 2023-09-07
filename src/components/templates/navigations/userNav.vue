<script setup>
import { createPage } from '../../../database/main'
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

</script>

<template>
    <header>
        <div>
            <nav>
                <ul>
                    <li v-for="(path, index) in nav.paths" :key="nav.paths">
                        <RouterLink :to="path == '/' ? adminLinkExtention == '' ? '/' : adminLinkExtention : path + adminLinkExtention"> 
                            {{ nav.titles[index] }}
                        </RouterLink>
                        <template v-if="adminLinkExtention == '/admin'">
                            <p>
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
    </header>
</template>