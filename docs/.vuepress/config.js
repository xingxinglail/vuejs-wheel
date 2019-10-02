module.exports = {
    base: '/vuejs-wheel/',
    title: 'wheel ui',
    description: '帮助你构建更好的应用程序',
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: 'GitHub', link: 'https://github.com/xingxinglail/vuejs-wheel' },
        ],
        sidebar: [
            {
                title: '入门',
                collapsable: false,
                children: [
                    '/install/',
                    '/get-started/',
                ]
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/components/icon',
                    '/components/button',
                    '/components/input',
                    '/components/layout',
                    '/components/container',
                    '/components/collapse',
                    '/components/cascader',
                    '/components/carousel',
                    '/components/popover',
                    '/components/tabs',
                    '/components/toast',
                    '/components/menu',
                    '/components/pagination',
                    '/components/table',
                    '/components/sticky',
                ]
            }
        ]
    }
}
