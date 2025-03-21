# OpenTiny Icons 介绍

`OpenTiny Icons`图标库是`Opentiny Design`规范中，统一设计的基础图标，以及华为云控制台开发时,涉及的全量的云服务图标和服务扩展图标。

+ 系统基础图标： 满足常见组件库开发，业务项目开发的场景
+ IT 系统图标： 满足计算机/云行业的应用开发的场景
+ 账号权限图标： 满足后台管理等应用开发的场景
+ 华为云服务图标： 满足使用华为云服务图标的场景
+ 状态图标 ：常见的空数据，请求状态，应用权限等场景

## Syntax Highlighting

<i class="ci-search" />

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
