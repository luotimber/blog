---
title: Sharding Sphere
date: 2022-07-23
tags:
- Sharding Sphere
---

# Sharding Sphere

tip问题：

![img](http://blogs.luckyluo.top:9000/blogimg/9dda3756-6a12-4b96-ac60-866e667349a3.jpg)

传感器数据以1小时一条频率，单台设备每年8760条、三年26280条，设备数量达到190台时候，建议分库分表；

传感器数据以半小时一条频率，单台设备每年17520条、三年52560条，设备数量达到95台时候，建议分库分表；



## 1、基本概念

（1）什么是 Sharding Sphere

（2）分库分表

2、Sharding-JDBC 分库分表操作

3、Sharding-Proxy 分库分表操作

### 什么是ShardingSphere

1、一套开源的分布式数据库中间件解决方案

2、有三个产品：Sharding-JDBC 和 Sharding-Proxy

3、定位为关系型数据库中间件，合理在分布式环境下使用关系型数据库操作

### 什么是分库分表

1、数据库数据量不可控的，随着时间和业务发展，造成表里面数据越来越多，如果再去对数

据库表 curd 操作时候，造成性能问题。

2、方案 1：从硬件上

3、方案 2：分库分表

\* 为了解决由于数据量过大而造成数据库性能降低问题。

方案一：增加硬件性能

方案二：分库分表处理

![image-20220728090310920](http://blogs.luckyluo.top:9000/blogimg/58f114c8-bca6-4965-9d9f-9b931ba1a29c.png)

## 分库分表的方式

1、分库分表有两种方式：垂直切分和水平切分

2、垂直切分：垂直分表和垂直分库

3、水平切分：水平分表和水平分库

4、垂直分表

（1）操作数据库中某张表，把这张表中一部分字段数据存到一张新表里面，再把这张表另一

部分字段数据存到另外一张表里面

![image-20220728091219990](http://blogs.luckyluo.top:9000/blogimg/2b3a1e5d-1276-4b46-a674-9276327ff391.png)

![image-20220728091508167](http://blogs.luckyluo.top:9000/blogimg/c31804b9-87fa-4ae7-8fb1-b2ea36a0ad5b.png)

5、垂直分库

（1）把单一数据库按照业务进行划分，专库专表

6、水平分库

![image-20220728091921533](http://blogs.luckyluo.top:9000/blogimg/5a39a337-78b0-463e-89fe-23ecce2ffaf4.png)

7、水平分表

![image-20220728092214108](http://blogs.luckyluo.top:9000/blogimg/b3cce9ef-e853-4d37-a21c-384aaf9dde6f.png)

### 分库分表应用和问题

1、应用

（1）在数据库设计时候考虑垂直分库和垂直分表

（2）随着数据库数据量增加，不要马上考虑做水平切分，首先考虑缓存处理，读写分离，使

用索引等等方式，如果这些方式不能根本解决问题了，再考虑做水平分库和水平分表

2、分库分表问题

（1）跨节点连接查询问题（分页、排序）

（2）多数据源管理问题

## Sharding-JDBC **简介**

1、是轻量级的 java 框架，是增强版的 JDBC 驱动

### 2、Sharding-JDBC

（1）主要目的是：简化对分库分表之后数据相关操作

![image-20220728092340038](http://blogs.luckyluo.top:9000/blogimg/71d0b470-a57b-48eb-89be-e2027d39827b.png)

### Sharding-JDBC实现水平分表

1、搭建环境

（1）技术：SpringBoot 2.2.1+ MyBatisPlus + Sharding-JDBC + Druid 连接池

（2）创建 SpringBoot 工程

（3）引入需要的依赖

```xml
 <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.3.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.shardingsphere</groupId>
            <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
            <version>4.0.0-RC1</version>
        </dependency>
    </dependencies>
```

3、编写代码实现对分库分表后数据的操作

（1）创建实体类，mapper

![image-20220728112259143](http://blogs.luckyluo.top:9000/blogimg/8f9593bc-9141-4e75-b588-c8753d6b4534.png)

```
@Data
public class Point {
    private Long id;
    private String name;
}
```

4、配置 Sharding-JDBC分片策略

（1）在项目 application.properties 配置文件中进行配置

![image-20220728092700203](http://blogs.luckyluo.top:9000/blogimg/ef7bcc18-e67b-448a-8dfe-38b022b3d67c.png)

```bash
# shardingjdbc 分片策略
# 配置数据源，给数据源起名称
spring.shardingsphere.datasource.names=m1
# 一个实体类对应两张表，覆盖
#配置数据源具体内容，包含连接池，驱动，地址，用户名和密码
spring.main.allow-bean-definition-overriding=true
spring.shardingsphere.datasource.m1.type=com.alibaba.druid.pool.DruidDataSource
spring.shardingsphere.datasource.m1.driver-class-name=com.mysql.cj.jdbc.Driver
spring.shardingsphere.datasource.m1.url=jdbc:mysql://localhost:3306/gis?serverTimezone=GMT%2B8
spring.shardingsphere.datasource.m1.username=root
#指定 course 表分布情况，配置表在哪个数据库里面，表名称都是什么 m1.point1 ,m1.point2
spring.shardingsphere.datasource.m1.password=123456
spring.shardingsphere.sharding.tables.point.actual-data-nodes=m1.point$->{1..2}
# 指定 course 表里面主键 cid 生成策略 SNOWFLAKE
spring.shardingsphere.sharding.tables.point.key-generator.column=id
spring.shardingsphere.sharding.tables.point.key-generator.type=SNOWFLAKE
# 指定分片策略 约定 cid 值偶数添加到 course_1 表，如果 cid 是奇数添加到 course_2表
spring.shardingsphere.sharding.tables.point.table-strategy.inline.sharding-column=id
spring.shardingsphere.sharding.tables.point.table-strategy.inline.algorithm-expression=point$->{id % 2 + 1}
# 打开 sql 输出日志
spring.shardingsphere.props.sql.show=true

```

5、编写测试代码

```java
@SpringBootTest
class ShardingDemoApplicationTests {
    @Autowired
    private PointMapper pointMapper;

    @Test
    void add() {

        for (int i = 0; i < 10; i++) {
            Point point = new Point();
            point.setName("a" + i);
            pointMapper.insert(point);
        }
    }

    @Test
    void list() {
        List<Point> points = pointMapper.selectList(null);
        System.out.println(points);

    }

}
```

### Sharding-JDBC实现水平分库

1、创建两个数据库和表

![image-20220728093308618](http://blogs.luckyluo.top:9000/blogimg/21355adf-bee9-4741-8e3d-c0a92d02a6e7.png)

数据库规则：proid为偶数数据添加到gis_1数据库，为奇数添加到gis_2数据库

表规则：id为偶数数据添加到point1数据库，为奇数添加到point2数据库

3、在SpringBoot 配置文件配置数据库分片规则

```xml

# shardingjdbc 分片策略
# 配置数据源，给数据源起名称,
# 水平分库，配置两个数据源
spring.shardingsphere.datasource.names=m1,m2
# 一个实体类对应两张表，覆盖
#配置第一个数据源具体内容，包含连接池，驱动，地址，用户名和密码
spring.main.allow-bean-definition-overriding=true
spring.shardingsphere.datasource.m1.type=com.alibaba.druid.pool.DruidDataSource
spring.shardingsphere.datasource.m1.driver-class-name=com.mysql.cj.jdbc.Driver
spring.shardingsphere.datasource.m1.url=jdbc:mysql://localhost:3306/gis_1?serverTimezone=GMT%2B8
spring.shardingsphere.datasource.m1.username=root
#配置第二个数据源具体内容，包含连接池，驱动，地址，用户名和密码
#指定数据库分布情况，数据库里面表分布情况
spring.shardingsphere.datasource.m1.password=123456
spring.shardingsphere.datasource.m2.type=com.alibaba.druid.pool.DruidDataSource
spring.shardingsphere.datasource.m2.driver-class-name=com.mysql.cj.jdbc.Driver
spring.shardingsphere.datasource.m2.url=jdbc:mysql://localhost:3306/gis_2?serverTimezone=GMT%2B8
spring.shardingsphere.datasource.m2.username=root
spring.shardingsphere.datasource.m2.password=123456
# m1 m2 point_1 point_2
spring.shardingsphere.sharding.tables.point.actual-data-nodes=m$->{1..2}.point$->{1..2}
# 指定 course 表里面主键 id 生成策略 SNOWFLAKE
spring.shardingsphere.sharding.tables.point.key-generator.column=id
spring.shardingsphere.sharding.tables.point.key-generator.type=SNOWFLAKE
# 指定表分片策略 约定 id 值偶数添加到 point1 表，如果 id 是奇数添加到point2 表
spring.shardingsphere.sharding.tables.point.table-strategy.inline.sharding-column=id
spring.shardingsphere.sharding.tables.point.table-strategy.inline.algorithm-expression=point$->{id % 2 + 1}
# 指定数据库分片策略 约定 proid 是偶数添加 m1，是奇数添加 m2
#spring.shardingsphere.sharding.default-database-strategy.inline.sharding-column=proid
#spring.shardingsphere.sharding.default-database-strategy.inline.algorithm- expression=m$->{proid % 2 + 1}
spring.shardingsphere.sharding.tables.point.database-strategy.inline..sharding-column=proid
spring.shardingsphere.sharding.tables.point.database-strategy.inline.algorithm-expression=m$->{proid % 2 + 1}

# 打开 sql 输出日志
spring.shardingsphere.props.sql.show=true
```

4、编写测试方法

```java
/======================测试水平分库=====================

    /**
     * 测试水平分库分表
     */
    @Test
    public void addCourseDb() {
        for (int i = 0; i < 10; i++) {
            Point point = new Point();
            point.setName("aa"+i);
            //分库根据 proid
            point.setProid(Long.valueOf(i));
            pointMapper.insert(point);
        }

    }
    /**
     * 测试水平分库分表
     */
    @Test
    void list1() {
        List<Point> points = pointMapper.selectList(null);
        System.out.println(points);

    }
```

### Sharding-JDBC实现垂直分库

1、创建数据库和表

2、编写操作代码

配置垂直分库策略

```xml
# shardingjdbc 分片策略
# 配置数据源，给数据源起名称,
# 水平分库，配置两个数据源
spring.shardingsphere.datasource.names=m1,m2,m0 
# 一个实体类对应两张表，覆盖
spring.main.allow-bean-definition-overriding=true #配置第一个数据源具体内容，包含连接池，驱动，地址，用户名和密码
spring.shardingsphere.datasource.m1.type=com.alibaba.druid.pool.DruidDataSourc
e 
spring.shardingsphere.datasource.m1.driver-class-name=com.mysql.cj.jdbc.Driver 
spring.shardingsphere.datasource.m1.url=jdbc:mysql://localhost:3306/edu_db_1?s
erverTimezone=GMT%2B8 
spring.shardingsphere.datasource.m1.username=root 
spring.shardingsphere.datasource.m1.password=root #配置第二个数据源具体内容，包含连接池，驱动，地址，用户名和密码
spring.shardingsphere.datasource.m2.type=com.alibaba.druid.pool.DruidDataSourc
e 
spring.shardingsphere.datasource.m2.driver-class-name=com.mysql.cj.jdbc.Driver 
spring.shardingsphere.datasource.m2.url=jdbc:mysql://localhost:3306/edu_db_2?s
erverTimezone=GMT%2B8 
spring.shardingsphere.datasource.m2.username=root 
spring.shardingsphere.datasource.m2.password=root 
#配置第三个数据源具体内容，包含连接池，驱动，地址，用户名和密码
spring.shardingsphere.datasource.m0.type=com.alibaba.druid.pool.DruidDataSourc
e 
spring.shardingsphere.datasource.m0.driver-class-name=com.mysql.cj.jdbc.Driver 
spring.shardingsphere.datasource.m0.url=jdbc:mysql://localhost:3306/user_db?se
rverTimezone=GMT%2B8 
spring.shardingsphere.datasource.m0.username=root 
spring.shardingsphere.datasource.m0.password=root 
# 配置 user_db 数据库里面 t_user 专库专表
spring.shardingsphere.sharding.tables.t_user.actual-data-nodes=m$->{0}.t_user 
# 指定 course 表里面主键 cid 生成策略 SNOWFLAKE
spring.shardingsphere.sharding.tables.t_user.key-generator.column=user_id 
spring.shardingsphere.sharding.tables.t_user.key-generator.type=SNOWFLAKE 
# 指定表分片策略 约定 cid 值偶数添加到 course_1 表，如果 cid 是奇数添加到
course_2 表
spring.shardingsphere.sharding.tables.t_user.table-strategy.inline.shardingcolumn=user_id 
spring.shardingsphere.sharding.tables.t_user.table-strategy.inline.algorithmexpression=t_user
```

3、编写测试代码

```java
//注入 user 的 mapper
@Autowired
private UserMapper userMapper;
//======================测试垂直分库==================
//添加操作
@Test
public void addUserDb() {
 User user = new User();
 user.setUsername("lucy");
 user.setUstatus("a");
 userMapper.insert(user);
}
```

