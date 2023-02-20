
module.exports = {
    title: 'luo先生的笔记',
    description: 'luo先生带你上王者',
    dest: './dist',
    port: '9009',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}],
        ['link', {rel: 'stylesheet', href: '/css/style.css'}],
    ],
    markdown: {
        lineNumbers: true
    },
    theme: 'reco',
    themeConfig: {
        nav: require("./nav.js"),
        sidebar: require("./sidebar.js"),
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    },
    plugins: [

        ['@vuepress/plugin-back-to-top', true],
        ['@vuepress/nprogress',true],
        ['@vssue/vuepress-plugin-vssue', {
            // set `platform` rather than `api`
            platform: 'github',
            locale: 'zh', //语言
            // all other options of Vssue are allowed
            owner: 'luotimber', //github账户名
            repo: 'vssue', //github一个项目的名称
            clientId: 'd0d6bb8c5fae2ae665e0', //注册的Client ID
            clientSecret: '820e14e42f0feb3fee4a505f45cb57dd01cabd80', //注册的Client Secret
            autoCreateIssue:true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
        }],
    ],
    // head: headConf,

}
