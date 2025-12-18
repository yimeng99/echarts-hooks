import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ECharts Hooks",
  description: "Vue composables for ECharts",
  ignoreDeadLinks: true,  // 禁用死链检查
  base: "/echarts-hooks/",
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API 参考', link: '/api/' },
      { text: '示例', link: '/examples/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'useEChart', link: '/api/useEChart' },
            { text: 'useEChartGl', link: '/api/useEChartGl' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '基础用法', link: '/examples/basic' },
            { text: '3D 图表', link: '/examples/gl' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025-present ECharts Hooks'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outlineTitle: '本页目录',

    lastUpdatedText: '最后更新时间',

    langMenuLabel: '语言',

    returnToTopLabel: '回到顶部',

    sidebarMenuLabel: '菜单',

    darkModeSwitchLabel: '主题',

    lightModeSwitchTitle: '切换到浅色模式',

    darkModeSwitchTitle: '切换到深色模式'
  }
})
