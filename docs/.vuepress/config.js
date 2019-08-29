/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 19:55:55
 * @LastEditTime: 2019-08-15 21:03:31
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  title: '个人博客',
  base: '/',
  dest: './docs/.vuepress/dist',
  themeConfig: {
    theme: 'awesome',
    lastUpdated: '有志者，事竞成；苦心人，天不负',
    // 添加导航栏
    nav: [{
        text: 'vue',
        link: '/'
      },
      {
        text: 'css',
        link: '/'
      },
      {
        text: 'js',
        link: '/'
      },
      {
        text: 'github',
        items: [{
            text: '1',
            link: 'https://github.com/fengjinlong'
          },
          {
            text: '2',
            link: 'https://github.com/fengjinlong'
          },
        ]
      }
    ],
    sidebar: [
      {
        title: 'JavaScript', // 侧边栏名称
        collapsable: true, // 可折叠
        children: [
          '/js/es5',
          '/js/es6',
          '/js/语言精髓',
          '/js/深拷贝'
        ]
      },
      {
        title: 'CSS',
        collapsable: true,
        children: [
          ['/css/模仿', 'mf'],
          ['/css/css', 'css']
        ]
      },
      {
        title: 'HTML',
        collapsable: true,
        children: [
          ['/html/index1', 'html']
        ]
      },
      {
        title: 'linux',
        collapsable: true,
        children: [
          ['/linux/in', '文件操作']
        ]
      },
      {
        title: 'http',
        collapsable: true,
        children: [
          ['/http/http基础', '基础'],
          ['/http/nginx', 'nginx']
        ]
      },
      {
        title: 'yarn',
        collapsable: true,
        children: [
          ['/yarn/基础', '基础']
        ]
      },
      {
        title: 'php',
        collapsable: true,
        children: [
          ['/php/php', 'php相关']
        ]
      },
      {
        title: 'node',
        collapsable: true,
        children: [
          ['/node/1', 'node基础'],
          ['/node/2', '程序相关']
        ]
      },
      {
        title: 'mac',
        collapsable: true,
        children: [
          ['/mac/vscode', 'vscode快捷键']
        ]
      },
      {
        title: 'react',
        collapsable: true,
        children: [
          ['/react/demo', 'demo']
        ]
      },
      {
        title: 'interview',
        collapsable: true,
        children: [
          '/interview/js',
          '/interview/vue',
          '/interview/css'
        ]
      },
      {
        title: 'functional',
        collapsable: true,
        children: [
          '/functional/base',
          '/functional/博文'
        ]
      },
      {
        title: '手写代码',
        collapsable: true,
        children: [
          ['/手写代码系列/1', '手写代码']
        ]
      },
      {
        title: 'git',
        collapsable: true,
        children: [
          ['/git/basic', '基本操作']
        ]
      },
      {
        title: '博文',
        collapsable: true,
        children: [
          '/博文/blog',
          '/博文/学不进去'
        ]
      }
    ]
  }
}
