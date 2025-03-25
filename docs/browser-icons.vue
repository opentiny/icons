<template>
  <div class="settings">
    <label> 选择图标集:</label>
    <select id="sel-category" v-model="cat" @change="catChanged">
      <option value="base">系统图标</option>
      <option value="svc">服务图标</option>
      <option value="ext">扩展图标</option>
      <option value="stat">状态图标</option>
    </select>
    <label> 图标颜色:</label>
    <input id="sel-color" type="color" v-model="color" />
    <label> 复制方式:</label>
    <select id="sel-copy" v-model="copyType">
      <option value="all">完整标签</option>
      <option value="only-name">图标类名</option>
    </select>
  </div>
  <div
    id="list"
    :style="{ '--icon-color': `${color}` }"
    @click="copyIcon($event)"
  >
    <div
      v-for="(groupIcons, groupName) in displayGroups"
      :key="groupName"
      class="icons-group"
    >
      <h2 class="icons-group-title" title="图标数">
        <span>{{ groupName }}</span>
        <sup class="icon-counts">{{ groupIcons.length }}</sup>
      </h2>
      <div v-for="(icon, index) in groupIcons" :key="index" class="icon-item">
        <i :class="[cat, 'ci-' + icon.name]" :data-name="icon.name"></i>
        <div class="icon-title" :title="icon.nameCn">{{ icon.nameCn }}</div>
        <div class="icon-name" :title="icon.name">{{ icon.name }}</div>
      </div>
    </div>
  </div>

  <div class="tip">
    {{ copyText + ' 复制成功' }}
  </div>  
</template>

<script setup>
import { categorys } from "../categorys.ts";
import { ref, computed, nextTick } from "vue";

const emit = defineEmits(["catChanged"]);

const cat = ref("base");
const color = ref("#575757");
const copyType = ref("all");

const clsPrefix = computed(() => {
  return cat.value === "base" ? "ci-" : "ci-" + cat.value + "-";
});

const displayGroups = computed(() => {
  const icons = categorys[cat.value];

  const sortedGroups= Object.keys(icons)
    .sort((groupName1, groupName2) => {
      const num1 = parseInt(groupName1.split("-")[0]);
      const num2 = parseInt(groupName2.split("-")[0]);
      return num1 > num2 ? 1 : -1;
    })
    .map((groupName) => {
      let groupIcons = icons[groupName];
      icons[groupName] = groupIcons.sort((g1, g2) =>
        g1.order > g2.order ? 1 : -1
      );
      return [groupName,icons[groupName]]
    });
 
  return Object.fromEntries(sortedGroups);
});


const copyText=ref('')
let rmTimer = 0; 

const copyIcon = (ev) => {
  const target = ev.target;
  const name = target.dataset.name;
  if (name) {
    const cls = "ci-" + name;
    const tag = `<i class="${cls}"></i>`;
    copyText.value = copyType.value === "all" ? tag : cls;
    
    const tip = document.querySelector(".tip");
    tip.classList.add("active");  
    
    rmTimer && clearTimeout(rmTimer);
    rmTimer = setTimeout(() => {
      tip.classList.remove("active");
    }, 3000);

    navigator.clipboard.writeText(copyText.value);
  }
};

const catChanged = (ev) => {
  nextTick(() => {
    emit("catChanged", displayGroups.value);
  });
};


</script>

<style scoped>
/** 控制区 */
select,
input {
  appearance: auto;
  cursor: pointer;
  font-size: 16px;
}
.settings {
  width: 520px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings *:not(label) {
  font-weight: bold;
}

/** 组别样式 */
.icons-group {
  margin-bottom: 0;
  margin-top: 32px;
}
.icon-counts {
  color: #0057c3;
  text-decoration: underline;
  margin-left: 8px;
  cursor: pointer;
}

/** 图标项样式 */
#list .icon-item {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  color: #575d6c;
}
#list i {
  margin: 20px;
  transition: all 0.5s;
  color: var(--icon-color);
}
#list i:hover {
  transform: scale(1.5);
  cursor: copy;
}

.icon-title,
.icon-name {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/** 图标尺寸的定制 */
#list .base {
  font-size: 32px;
}
#list .base ~ div {
  width: 80px;
}
#list .svc {
  font-size: 72px;
}
#list .svc ~ div {
  width: 108px;
}
#list .ext,
#list .stat {
  font-size: 80px;
}
#list .ext ~ div,
#list .stat ~ div {
  width: 120px;
}

/** 提示信息 */
.tip {
  position: fixed;
  top: 80px;
  left: 80%;
  transform: translateX(-50%);
  background-color: #c8f3ce;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  display: none;
}
.tip.active {
  display: block;
}
</style>
