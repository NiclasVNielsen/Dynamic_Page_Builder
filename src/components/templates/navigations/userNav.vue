<script setup>
const props = defineProps({
  nav: 'array',
  adminLinkExtention: 'string'
})
const nav = props.nav
let adminLinkExtention = props.adminLinkExtention

</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <ul>
                    <li v-for="(path, index) in nav.paths" :key="nav.paths">
                        <!-- <RouterLink :to="path + adminLinkExtention" > </RouterLink> -->
                        <RouterLink :to="path == '/' ? adminLinkExtention == '' ? '/' : adminLinkExtention : path + adminLinkExtention"> 
                            {{ nav.titles[index] }}
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>