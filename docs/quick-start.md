<script setup>
import {VTCodeGroup,VTCodeGroupTab} from "@vue/theme"
</script>

# 快速上手

`OpenTiny Icons`图标库是`CSS`图标方案，所以支持所有前端框架，也支持`UnoCSS`的图标插件使用场景。

## 安装图标库

本节中，我们将介绍如何安装图标库依赖以及图标库的内容。

```sh
$ npm install @opentiny/icons
```

安装后，在`node_modules/@opentiny/icons` 目录中，可以观察到以下内容:

```
./
|─json
|  └─ icons.json
|─style
|  |─ all.css
|  |─ base.css
|  |─ svc.css
|  |─ ext.css
|  └─ stat.css
|-svgs
|  └─ *.svg
|-README.md

```

## 整体引入 css 使用

在项目工程中，直接引入`@opentiny/icons`图标的 css 文件, 也可以根据使用情况，按`图标类别`导入图标，以减小引入样式文件的体积。

```css
import "@opentiny/icons/style/all.css"
```

图标类别：

- 全量图标: all.css
- 基础图标: base.css
- 服务图标: svc.css
- 服务扩展图标: ext.css
- 状态图标: stat.css

:::warning 提示

所有图标类名的前缀统一为 `ci-类别-*`, 其中`base类别`的图标最为常用，所以省略了类别，其它类别的图标必须带着类别。
比如：

- ci-home <i class="ci-home"></i> ci-email <i class="ci-email"></i> 是 `base` 类别的图标。
- ci-svc-esc <i class="ci-svc-ecs"></i> 是服务图标， `svc`的类别不能省略。
- ci-ext-ideahub <i class="ci-ext-ideahub"></i> 是扩展服务图标，`ext`的类别不能省略。
  :::

## 按需引用 (推荐)

通过引入 `@unocss/preset-icons` 插件，可以实现按需引用图标，大大减小构建后的文件大小。

```javascript{16}
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
            ci: () => import('@opentiny/icons/json/icons.json', { assert: { type: 'json' }}).then((i) => i.default)
          }
        })
      ]
    })
  ]
})
```

:::tip 实用技巧

修改`collections`中的键值，可以迅速调整图标前缀，避免与其它图标库冲突！
:::

## 自定义颜色和大小

单色的`CSS`图标支持通过字体和颜色去自定义图标样式。彩色图标仅支持自定义大小。

```html
<i class="ci-home" style="font-size:14px; color:#000;"></i>
<i class="ci-email" style="font-size:16px; color:#d32222;"></i>
<i class="ci-news" style="font-size:18x; color:#4822d3;"></i>
<i class="ci-date" style="font-size:20px; color:#40d322;"></i>
<hr />
<i class="ci-svc-ecs" style="font-size:72px;"></i>
<i class="ci-svc-obs" style="font-size:72px;"></i>
<i class="ci-svc-cbr" style="font-size:72px;"></i>
<i class="ci-svc-live" style="font-size:72px;"></i>
<hr />
```

<div style="display:flex; align-items: center; gap: 24px;">
  <i class="ci-home" style="font-size:14px; color:#000;"></i>   
  <i class="ci-email" style="font-size:20px; color:#d32222;"></i>   
  <i class="ci-news" style="font-size:24px; color:#4822d3;"></i>   
  <i class="ci-date" style="font-size:32px; color:#40d322;"></i>  
</div>
<hr />
<div style="display:flex; align-items: center; gap: 24px;">
  <i class="ci-svc-ecs" style="font-size:72px;"></i>
  <i class="ci-svc-obs" style="font-size:72px;"></i>
  <i class="ci-svc-cbr" style="font-size:72px;"></i>
  <i class="ci-svc-live" style="font-size:72px;"></i>
</div>
<hr />

## 使用 Svg 资源

图标库还提供了原始的`SVG图标资源`，用户可以直接使用它们。可能有以下的使用场景：

1. 在前端应用项目中直接引用 SVG 为组件。通常需要借助 Svg-Loader 等工具，比如：Vue用户使用`vite-svg-loader`，React用户使用`vite-plugin-svgr`插件工具。
2. 引用原始 SVG 内容，然后直接渲染到页面上。 
3. 在`Node`环境中读取文件内容，对文件进行处理后使用。 比如：调用`svgo`进行处理，生成字体文件或svg精灵图等。
