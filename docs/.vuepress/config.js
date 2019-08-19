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
          '/js/1',
          '/js/2',
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
        title: 'http',
        collapsable: true,
        children: [
          ['/http/http基础', '基础'],
          ['/http/nginx', 'nginx']
        ]
      }
    ]
  }
}
