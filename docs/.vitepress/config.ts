import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: " ",
  description: "A Cross-framework Icons Library",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/quick-start' },
      { text: '浏览图标', link: '/browser-icons' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '图标库介绍', link: '/introduce' },
          { text: '快速上手', link: '/quick-start' },
          { text: '浏览图标', link: '/browser-icons' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/opentiny/icons' },
    ],
    outline:{
      label: '目录',
    }
  }
})
