---
outline: deep
---

<script setup>
import { useData } from 'vitepress'
import BrowserIconsVue from "./browser-icons.vue"
const { site, theme, page, frontmatter } = useData()

frontmatter.outline={label:'页面导航'}
const catChanged=(val)=>{
    console.log(val,'changed.....',frontmatter)
}

</script>
 
 <BrowserIconsVue @catChanged="catChanged" />