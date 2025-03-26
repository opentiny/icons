<script setup>
import { useData , useRoute,contentUpdatedCallbacks } from 'vitepress'
import { ref, nextTick } from "vue"
import BrowserIconsVue from "./browser-icons.vue"

const catChanged=(val)=>{
 contentUpdatedCallbacks.forEach(fn=>fn())
}

nextTick(()=>{
    contentUpdatedCallbacks.forEach(fn=>fn())
})
</script>

<BrowserIconsVue @catChanged="catChanged" />
