module.exports = [
    {
        text: '总览', link: '/md/guide/notes/Overviewofknowledge.md'
    },
    {
        text: 'java', link: '/md/java/',
		items: [
            {
                text: 'java面向对象基础',
                items: [
                    {text: 'java面向对象基础', link: '/md/java/basic/java-basic-oop'},
                ]
            },
            {
                text: 'java进阶-集合框架',
                items: [
                    {text: 'java集合详解', link: '/md/java/collection/java-collection-all'},
                ]
            },
            {
                text: 'Java进阶 - 并发框架',
                items: [
                    {text: 'java并发知识体系', link: '/md/java/thread/java-thread-x-overview'},
                    {text: 'java并发理论基础', link: '/md/java/thread/java-thread-x-theorty'},
                    {text: 'java并发线程基础', link: '/md/java/thread/java-thread-x-thread-basic'},
                    {text: 'JUC知识体系与详解', link: '/md/java/thread/java-thread-x-juc-overview'},
                ]
            },
            {
                text: 'Java进阶 - IO框架',
                items: [
                    {text: 'java IO/NIO/AIO详解', link: '/md/java/io/java-io-overview'},

                ]
            },
            {
                text: 'Java进阶 - 新版本特性',
                items: [
                    {text: 'java 特性详解', link: '/md/java/java8/java8'},
                    {text: 'java 以上特性概述', link: '/md/java/java8up/java-8-up-overview.md'},
                    {text: 'Java 8 升Java 11 重要特性必读', link: '/md/java/java8up/java9-11'},
                    {text: 'Java 11 升Java 17 重要特性必读', link: '/md/java/java8up/java12-17'},

                ]
            },
            {
                text: 'Java进阶 - JVM相关',
                items: [
                    {text: 'java 特性详解', link: '/md/java/jvm/java-jvm-classload'},


                ]
            },
        ]
    },
    {
        text: '数据库', link: '/md/sql/',
		items: [
            {
                text: '数据库基础和原理',
                items: [
                    {text: '数据库原理', link: '/md/db/sql/sql-db'},
                    {text: 'SQL语言', link: '/md/db/sql-lan/sql-lan'},
                ]
            },
            {
                text: '关系型数据库',
                items: [
                    {text: 'MYSQL详解', link: '/md/db/sql-mysql/sql-mysql-overview'},
                    {text: 'ORACLE详解', link: '/md/java/collection/java-collection-all'},
                ]
            },
            {
                text: 'NoSQL 数据库',
                items: [
                    {text: 'Redis详解', link: '/md/db/nosql-redis/db-redis'},
                    {text: 'MongoDB详解', link: '/md/db/nosql-mongo/db-mongo'},
                ]
            },

        ]
    },
    {
        text: 'Spring', link: '/md/spring/',
		items: [
            {
                text: 'Spring Framework(v5.3)',
                items: [
                    {text: 'Spring框架知识体系', link: '/md/spring/spring/spring'},
                    {text: 'Spring和Spring框架组成', link: '/md/spring/spring/spring-x-framework-introduce'},
                    {text: '控制反转(IOC)', link: '/md/spring/spring/spring-x-framework-ioc'},
                    {text: '面向切面编程(AOP)', link: '/md/spring/spring/spring-x-framework-aop'},
                    {text: 'SpringMVC', link: '/md/spring/spring/spring-x-framework-springmvc'},
                ]

            },
            {
                text: 'SpringBoot系列(v2.5)',
                items: [
                    {text: 'SpringBoot 知识体系', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot入门', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot接口设计与实现', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot集成MySQL', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot集成ShardingJDBC', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot集成Redis', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot集成PostgreSQL', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot集成ElasticSearch', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot集成Socket', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot定时任务', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot后端视图', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot监控', link: '/md/spring/spring/spring'},
                    {text: 'SpringBoot进阶', link: '/md/spring/spring/spring'},
                ]

            },


        ]
    },

    {
        text: 'Python', link: '/md/python/',
		items: [
            {
                text: 'Python基础与原理',
                items: [
                    {text: '数据库原理', link: '/md/python/basic/python-basic'},
                    {text: 'SQL语言', link: '/md/python/basic/python-basic'},
                ]
            },
            {
                text: 'Python小工具集',
                items: [
                    {text: 'musql', link: '/md/python/basic/python-basic'}
                ]
            },

        ]
    },
    {
        text: '框架|中间件', link: '/md/arch/',
        items: [
            {
                text: '分库分表框架',
                items: [
                    {text: 'ShardingSphere详解', link: '/md/arch/ShardingSphere/ShardingSphere'},
                ]
            },
            {
                text: '服务框架',
                items: [
                    {text: 'Nacos', link: '/md/arch/SpringCloudAlibaba/nacos'},
                    {text: 'Seata', link: '/md/arch/SpringCloudAlibaba/seata'},
                ]
            },
            {
                text: '架构设计',
                items: [
                    {text: 'musql', link: '/md/python/basic/python-basic'}
                ]
            },

        ]
    },
    {
        text: '容器', link: '/md/container/',
        items: [
            {text: 'docker', link: '/md/container/docker/docker-Ubuntu16.md'},
            {text: 'docker-compose', link: '/md/container/docker-compose/Docker-compose-RocketMQ.md'},
        ]
    },
    // {
    //     text: 'spring', link: '/spring/',
	// 	items: [
    //         {text: 'spring基础', link: '/spring/spring'},
    //         {text: 'springboot基础', link: '/spring/springboot-base'},
    //         {text: 'springboot进阶', link: '/baodian/springboot-jinjie'},
    //     ]
    // },
    // {
    //     text: '框架', link: '/framework/',
    // },
    // {
    //     text: '架构', link: '/architecture/',
    //
    // },
    // {
    //     text: '工具',
    //     items: [
	// 		{
    //             text: '在线编辑',
	// 			items: [
	// 				{text: '图片压缩', link: 'https://tinypng.com/'}
	// 			]
    //         },
	// 		{
    //             text: '在线服务',
	// 			items: [
	// 				{text: '阿里云', link: 'https://www.aliyun.com/'},
	// 				{text: '腾讯云', link: 'https://cloud.tencent.com/'}
	// 			]
    //         },
	// 		{
    //             text: '博客指南',
	// 			items: [
	// 				{text: '掘金', link: 'https://juejin.im/'},
	// 				{text: 'CSDN', link: 'https://blog.csdn.net/'}
	// 			]
    //         },
    //
    //     ]
    // },

    { text: 'GIS', link: '/md/gis/notes/arcgis-tif-merge' },
    { text: '杂谈', link: '/md/Q&A/notes/centos-Swap' },
    { text: '时间轴', link: '/timeline/', icon: 'reco-date' }
]
