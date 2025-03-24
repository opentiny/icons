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

安装后，在`node_modules/@opentiny/icons` 目录中，可以观察到以下内容

```
icons/
|─json
|  └─ icons.json
|─style
|  |─ all.css
|  |─ base.css
|  |─ svc.css
|  |─ ext.css
|  └─ stat.css

```

## 整体引入 css 使用

在工程中的适应位置，引入图标的 css 文件, 也可以根据使用情况，按`类别`导入图标，以减小引入样式文件的体积.

```css
import "@opentiny/icons/style/all.css"
```

- 全量图标: all.css
- 基础图标: base.css
- 服务图标: svc.css
- 服务扩展图标: ext.css
- 服务扩展图标: stat.css

:::warning 提示

所有图标类名的前缀统一为 `ci-类别-*`,  其中`base类别`的图标常用，所以省略了类别，其它类别的图标必须带着类别。
比如： 
- ci-home <i class="ci-home"></i> ci-email <i class="ci-email"></i> 是 `base` 类别的图标。   
- ci-svc-esc <i class="ci-svc-ecs"></i> 是服务图标， `svc`的类别不能省略。
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
            ci: () => import('@opentiny/icons/json/icons.json').then((i) => i.default)
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
