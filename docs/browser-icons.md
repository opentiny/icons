

<script setup>
import { useData , useRoute,contentUpdatedCallbacks } from 'vitepress'
 
import {ref, nextTick  } from "vue"
import BrowserIconsVue from "./browser-icons.vue"

// const { site, theme, page, frontmatter } = useData()
// const route= useRoute()
const catChanged=(val)=>{
 contentUpdatedCallbacks.forEach(fn=>fn())
}

nextTick(()=>{
    contentUpdatedCallbacks.forEach(fn=>fn())
})
</script>

 <BrowserIconsVue @catChanged="catChanged" />
 <!-- <BrowserIconsVue  /> -->
