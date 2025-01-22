# Cloud Design Icons 云规范图标库

该图标库包含云控制台应用开发中的系统图标，各云服务图标和服务扩展图标。其中系统图标是单色的常用图标，具有统一的尺寸和内边距，容易集成到项目中。服务图标和服务扩展图标为明亮艳丽的彩色图标，突出了各服务的特点。

它是跨框架的图标库，支持所有前端Web项目， 原生的javascript工程，Vue/React/Angular等等。
它即支持原始的`CSS` 样式文件引入，也支持与 `Vite` 等构建工程使用，详见使用小节。

## 安装 Installation

```
npm install @opentiny/cloud-icons

```

## 如何使用 Usage

1. 整体引入css使用:

   在工程中的适应位置，引入图标的css文件： `import "@opentiny/cloud-icons/style/all.css"`, 也可以根据使用情况，按`类别`导入图标，以减小引入样式文件的体积.

- 全量图标: all.css
- 基础图标: base.css
- 服务图标: svc.css
- 服务扩展图标: ext.css
- 服务扩展图标: stat.css

2. 引入 @unocss/preset-icons 插件使用

```javascript
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [
        presetIcons({
          prefix: '',
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle'
          },
          collections: {
            ci: () => import('@opentiny/cloud-icons/json/icons.json').then((i) => i.default)
          }
        })
      ]
    })
  ]
})
```

3. 使用图标
   无论通过哪个方式引入，此时都可以通过图标类名引用所需图标：`<i class="ci-search"></i>` 。通过标签的`font-size`属性，去修改图标的大小，对于单色图标，通过`color`修改图标的颜色。

4. 借助`Iconify` 提供的组件
  `Iconify`生态系统有一个组件系统，它提供一个图标组件以支持图标的加载，参考[Iconify/Icons on Demand](https://iconify.design/docs/icon-components)  

## 浏览所有图标 Browser Icons

[在线预览](https://shenjunjian.github.io)

# 开发指南

## 导入图标

将设计师提供的图标导入`svgs` 目录， 文件夹及文件名必须符合以下要求：

1. 子目录名称为大分类，每次增加大分类文件夹后，需要在 `index.html` 中的分类下拉列表中，添加相应的名称
2. 分类目录的子目录名为“图标组名”， 用数字控制组名的排序。
3. 文件名必须符合： 排序#中文名-英文名.svg

图标导入时需要检查，以免导入不符合规范的图标：

1. 图标尺寸是否规范， 是否正方形，是否固定内边距；
2. 不需要顶部的 < ?xml version="1.0" encoding="utf-8"? >
3. 单色图标需要 fill="currentColor"
4. 图标内不允许有 <image> 标签, 比如openkruise.svg

## 已知问题和约束

- `svg` 文件名要统一，尽量小写和连字符， 中文- 英文字母， 不要 @， 不要有空格
- `svg` 文件名涉及专有服务名时，可以大写，但是受`@unocss/preset-icons` 库的限制，它不支持图标类名大写，所以导出的图标名称统一为小写。
