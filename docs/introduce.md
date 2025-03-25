# OpenTiny Icons 介绍

`OpenTiny Icons`图标库是`Opentiny Design`团队开源的基础图标，华为云服务图标和服务扩展图标。基础图标以线型图标为主的设计风格，图标统一为`16*16`的大小，拥有安全边距，保证了一致的视觉大小。华为云服务图标是一组彩色高清图标库， 统一为 `72*72`的大小，覆盖了云计算、云存储、云数据库、容器中间件等等所有服务的官方图标。

+ 系统基础图标： 满足常见组件库开发，业务项目开发的场景
+ IT 系统图标： 满足计算机/云行业的应用开发的场景
+ 账号权限图标： 满足后台管理等应用开发的场景
+ 华为云服务图标： 满足使用华为云服务图标的场景
+ 状态图标 ：常见的空数据，请求状态，应用权限等场景

## 动机

在前端界的Anthony Fu大神在自己的博客[《聊聊纯 CSS 图标》](https://antfu.me/posts/icons-in-pure-css-zh)中提到：**在纯 CSS 中按需使用任何图标的能力**的一套方案，能支持单色和彩色图标，并且他将这个图标方案集成在了`UnoCSS`的[图标库预设](https://unocss.dev/presets/icons)中。在一次线下大会上，私下问Anthony Fu大神这个图标的问题，得到了`组件库不适合做图标`的意见，让我们更加坚定用`CSS`来做图标的想法。

于是我们将`Opentiny Design`团队设计的`SVG`图标资源，使用Antfu的[图标算法](https://github.com/opentiny/icons/blob/7e1dde24f54c678dabc3eb4f3c837380a2a66a1c/scripts/build.ts#L81)转换为`CSS`图标。在我们的实际测试中，`CSS`图标的性能要强于直接渲染 `<svg>`标签。同时导出了`@iconify-json  格式`,支持`@unocss/preset-icons`的插件的使用。

## 开源/贡献

`Opentiny Design`团队开源了全部的基础图标和华为云服务的图标，并将长期更新。但是本仓库不接受外部用户提交，如果你在使用中遇到了问题，或者有新图标的需求，以及其它建议，欢迎在[本仓库的ISSUE](https://github.com/opentiny/icons/issues)进行交流。
 