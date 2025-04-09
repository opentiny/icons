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

引入`CSS`的时候，所有图标类名的前缀统一为 `ci-类别-*`, 其中`base类别`的图标最为常用，所以省略了类别，其它类别的图标必须带着类别。
比如：

- ci-home <i class="ci-home"></i> ci-email <i class="ci-email"></i> 是 `base` 类别的图标。
- ci-svc-esc <i class="ci-svc-ecs"></i> 是服务图标， `svc`的类别不能省略。
- ci-ext-ideahub <i class="ci-ext-ideahub"></i> 是扩展服务图标，`ext`的类别不能省略。
  :::

## 按需引用 (推荐)

通过引入 `@unocss/preset-icons` 插件，可以实现按需引用图标，减小构建产物大小，并且可以调整图标前缀，避免与其它图标库冲突。

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

然后在`main.ts` 中添加下面代码，以启用`UnoCSS`的功能 ：

```javascript
import 'virtual:uno.css'
```

经过以上配置，就可以正常使用所有的图标了。

:::warning 如何自定义一个图标

当需要使用设计师提供的`SVG图标`时， `@unocss/preset-icons` 插件允许我们快速的自定义图标 ,参考[UnoCSS文档](https://unocss.dev/presets/icons#customization) 。

```javascript{3-6}
          collections: {
            ci: () => import('@opentiny/icons/json/icons.json', { assert: { type: 'json' }}).then((i) => i.default),
            custom: {
              circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
              /* ...其它自定义图标... */
            },
          }
```

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
 