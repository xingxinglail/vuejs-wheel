module.exports = {
    base: '/vuejs-wheel/',
    title: 'wheel ui',
    description: '帮助你构建更好的应用程序',
    themeConfig: {
        nav: [
            { text: '主页', link: '/' }
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
                    '/components/button',
                    '/components/input',
                    '/components/layout',
                ]
            }
        ]
    }
}
