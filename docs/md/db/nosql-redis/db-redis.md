---
title: redis
date: 2017-12-28
tags:
- redis
- nosql
---
# redis

### nosql讲解

> 单机mysql的演进	

>垂直拆分--读写分离

>分库分表+水平拆分+mysql集群

> 什么是NoSql：
>
> not only sql （不仅是sql，泛指非关系型数据库，随着web2.0的诞生，传统的关系型数据库很难对付web2.0时代，尤其是超大规模的高并发的社区。暴露出很多难以克服的问题，nosql在当今大数据环境下发展的十分迅速，redis是发展最快的必须要掌握的技术。
>
> 很多的数据类型用户的个人信息，社交网络，地理位置。这些数据类型的存储不需要一个固定的格式。不需要多余的操作就可以横向扩展。

> nosql特点：
>
> 1、方便扩展（数据之间没有关系，很好扩展）
>
> 2、大数据量高性能（redis一秒可以写8万次，读取11万次，nosql的缓存是记录级，是一种细粒度的缓存，性能比较高）
>
> 3、数据类型是多样的（不需要事先设计数据库，随取随用，如果数据量十分大的表，很多人就无法设计了）
>
> 4、传统的RDBMS和NoSQL
>
> > 传统的RDBMS
> >
> > - 机构化组织
> > - sql
> > - 数据和关系都存在单独的表中
> > - 数据操作语言，数据定义语言
> > - 严格的一致性
> > - 基础的事务
>
> > Nosql 
> >
> > - 不仅是数据
> >
> > - 没有固定的查询语言
> >
> > - 键值对存储，列存储，文档存储，图像数据库（社交关系）
> >
> > - 最终一致性
> >
> > - cap定理和base理论（异地多活）
> > - 高性能、高可用、高可扩展

敏捷开发、极限编程、协同开发

任何一家互联网公司，都不能只是简简单单的让用户能用就好了



### 阿里巴巴架构演进

### nosql数据模型

#### kv键值对：

- 新浪：redis
- 美团：redis+tair
- 阿里、百度：redis+memecache

**文档型数据库（bson格式和json一样）：**

- mongodb
  - mongodb是一个基于分布式文件存储的数据库，C++编写，主要用于处理大量的文档。
  - mongodb是一个介于关系型数据库和非关系型数据库中间的产品，mongodb是非关系型数据库中功能最丰富，最像关系型数据库的。

- conthDB

**列存储数据库**

- HBase
- 分布式文件系统

**图关系数据库**

- 存放关系，如朋友圈社交网络，广告推荐。
- Neo4j，infoGrid

### nosql四大分类

### CAP

### BASE





### Redis安装（windows&Linux服务器）

### windows安装redis

### linux安装redis

1、下载安装包：`redis-6.2.1.linux.tar.gz`

2、上传到服务器，移动到/opt目录解压：tar -zxvf  redis-6.2.1.linux.tar.gz

![image-20210304091155458](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304091155458.png)

3、进入解压后的文件，找到redis的配置文件

![image-20210304091422391](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304091422391.png)



4、补充：ubuntu安装gcc编译器

```bash
1、更新包列表
	sudo apt update
2、安装build-essential软件包，该命令将安装一堆新包，包括gcc，g ++和make。
	sudo apt install build-essential
	
3、验证GCC编译器是否已成功安装
	gcc --version
```

5、环境安装

```bash
#确保gcc环境
gcc --version
#make安装
make
#make install安装
make install
```

![image-20210304093418442](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304093418442.png)

![image-20210304093442909](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304093442909.png)

6、redis的默认安装路径，`/usr/local/bin`

![image-20210304093656220](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304093656220.png)

7、将redis配置文件`/opt/redis-6.2.1/redis.conf`复制到当前目录下redisconfig目录下，先创建目录,以后就使用拷贝的文件启动

![image-20210304093908997](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304093908997.png)

8、redis默认不是后台启动的，修改配置文件

```bash
vim redis.conf
#修改deamonize 参数为yes
```

![image-20210304094110048](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304094110048.png)

9、启动redis服务，使用指定配置文件

`/usr/local/bin# redis-server redisconfig/redis.conf `



10、测试连接，使用rdis-cli连接测试

![image-20210304094531891](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304094531891.png)



11、查看进程是否开启

`ps -ef|grep redis`

![image-20210304094649002](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304094649002.png)



12、关闭redis服务

`SHUTDOWN`

![image-20210304094852114](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304094852114.png)

使用redis-cli连接后，使用shutdown关闭redis服务

![image-20210304095149122](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210304095149122.png)

使用`ps -ef|grep redis`查看进程是否存在验证是否已关闭服务



### 基础知识

redis默认有16个数据库

默认使用得是第0个

使用select进行数据库切换

```bash
127.0.0.1:6379> select 3 #数据库切换
OK
127.0.0.1:6379[3]> dbsize #查看DB大小
(integer) 0
127.0.0.1:6379[3]> keys * #查看数据库所有得key
(empty list or set)
127.0.0.1:6379[3]>

```

清除当前数据库 `flushdb`

清楚所有数据库 `FLUSHALL`

```bash
127.0.0.1:6379[3]> flushdb 
OK
127.0.0.1:6379[3]> FLUSHALL
OK
127.0.0.1:6379[3]> keys *
(empty list or set)
127.0.0.1:6379[3]>
```



> redis是单线程得

redis很快，官方表示，redis是基于内存操作，CPU不是redis性能瓶颈，redis得瓶颈是根据机器得内存和网络带宽，既然可以使用单线程来实现，就是用单线程了。

redis是c语言编写得，官方提供得数据未100000+得QPS，完全不比同样是使用key-value的Memecache差。

**redis为什么单线程还这么快**

​	误区一：高性能的服务器一定是多线程的？

​	误区二：多线程（CPU上下文会切换）一定比单线程效率高？

核心：redis是将所有的数据全部放在内存中的，所以说使用单线程去操作效率是最高的，多线程（CPU上下文会切换：耗时的操作），对于内存来说，如果没有上下文切换效率就是最高的，多次读写都是在一个cpu上的，在内存情况下，这个就是最佳的方案。

### 五大基本数据类型

> 官网

![image-20210302113726504](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210302113726504.png)

![image-20210302113807335](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210302113807335.png)

#### redis-key

```bash
127.0.0.1:6379[3]> keys * #查看所有key
1) "age"
2) "name"
127.0.0.1:6379[3]> EXISTS name #判断当前key是否存在
(integer) 1
127.0.0.1:6379[3]> EXISTS nameq
(integer) 0
127.0.0.1:6379[3]> move name 1 #移除当前key
(integer) 1
127.0.0.1:6379[3]> keys *
1) "age"
127.0.0.1:6379[3]> set name lll
OK
127.0.0.1:6379[3]> keys *
1) "age"
2) "name"
127.0.0.1:6379[3]> get name
"lll"
127.0.0.1:6379[3]> EXPIRE name 10 #设置key的国企时间，单位是秒
(integer) 1
127.0.0.1:6379[3]> ttl name #查看当前key的剩余时间
(integer) 6
127.0.0.1:6379[3]> ttl name
(integer) 2
127.0.0.1:6379[3]> get name
(nil)
127.0.0.1:6379[3]> type name #查看当前key 的类型
string
127.0.0.1:6379[3]> type age
string
127.0.0.1:6379[3]>                                                                                                                            
```

> 官网命令文档

```bash
http://www.redis.cn/commands.html
```



#### 	string(字符串)

```bash
127.0.0.1:6379[3]> set key1 v1 #s设置值
OK
127.0.0.1:6379[3]> get key1 #获得值
"v1"
127.0.0.1:6379[3]> keys * #获取所有key
1) "key1"
127.0.0.1:6379[3]> EXISTS k1 #判断某个key是否存在
(integer) 0
127.0.0.1:6379[3]> EXISTS key1
(integer) 1
127.0.0.1:6379[3]> APPEND key1  hello #追加字符串,如果当前key不存咋，就相当于set key
(integer) 7
127.0.0.1:6379[3]> STRLEN key1 #获取字符串长度
(integer) 7
127.0.0.1:6379[3]> APPEND key1 aafdsdfdsbkfdsb
(integer) 22
127.0.0.1:6379[3]> STRLEN key1
(integer) 22
127.0.0.1:6379[3]> 
```



```bash
# i++
# 步长i++
127.0.0.1:6379[3]> set views 0 #设置初始量
OK
127.0.0.1:6379[3]> get views
"0"
127.0.0.1:6379[3]> incr views #自增1
(integer) 1
127.0.0.1:6379[3]> incr views
(integer) 2
127.0.0.1:6379[3]> decr views #自减1
(integer) 1
127.0.0.1:6379[3]> INCRBY views 10 #可以设置步长，指定增量
(integer) 11
127.0.0.1:6379[3]> DECRBY views 5 #设置步长，指定减量
(integer) 6
127.0.0.1:6379[3]>               
```

> **字符串范围 range**

```bash
127.0.0.1:6379[3]> set k1 "hello aaa" #设置键值
OK
127.0.0.1:6379[3]> get k1
"hello aaa"
127.0.0.1:6379[3]> GETRANGE k1 0 3 #截取字符串，[0,3]
"hell"
127.0.0.1:6379[3]> GETRANGE k1 0 -1 #获取全部的字符串，和get key 命令效果引用
"hello aaa"
127.0.0.1:6379[3]>  
```

> 替换

```bash
127.0.0.1:6379[3]> set k2 abcdefg
OK
127.0.0.1:6379[3]> get k2
"abcdefg"
127.0.0.1:6379[3]> SETRANGE k2 1 XX #替换指定位置开始的字符串
(integer) 7
127.0.0.1:6379[3]> get k2
"aXXdefg"
127.0.0.1:6379[3]>  
```



> setex(set whit expire)  设置过期时间
>
> setnx(set if not exist)  不存在再设置（再分布式锁中会常用）

```bas
127.0.0.1:6379[3]> SETEX k3 30 hellllle #设置k3的值，30秒后过期
OK
127.0.0.1:6379[3]> ttl k3
(integer) 25
127.0.0.1:6379[3]> get k3
"hellllle"
127.0.0.1:6379[3]> SETNX mykey redis #如果mykey不存在，创建mykey
(integer) 1
127.0.0.1:6379[3]> keys *
1) "0"
2) "mykey"
3) "k2"
4) "k1"
127.0.0.1:6379[3]> ttl k3
(integer) -2
127.0.0.1:6379[3]> SETNX mykey mongodb #如果mykey存在，创建失败，也不会替换值
(integer) 0
127.0.0.1:6379[3]> get mykey
"redis"
127.0.0.1:6379[3]> 
```



> mset
>
> mget

```bash
127.0.0.1:6379[3]> keys *
(empty list or set)

127.0.0.1:6379[3]> mset k1 v1 k2 v2 k3 v3 #同时设置多个值
OK

127.0.0.1:6379[3]> keys *
1) "k3"
2) "k2"
3) "k1"

127.0.0.1:6379[3]> mget k1 k2 k3 #同时获取多个值
1) "v1"
2) "v2"
3) "v3"

127.0.0.1:6379[3]> MSETNX k1 v1 k4 v4 #msetnx 是一个原子性的操作，要么一起成功，要么一起失败。
(integer) 0
127.0.0.1:6379[3]> get k4
(nil)
127.0.0.1:6379[3]> 
```

> **对象**

```bash
set user:1 {name:zhangsan,age:3} #设置一个user:1对象,值为json字符串来保持的对象

#进阶用法：
#巧妙设计key：user:{id}:{filed} ,如此设计再redis中完全支持
127.0.0.1:6379[3]> mset user:1:name zhangsan user:1:age 2
OK
127.0.0.1:6379[3]> MGET user:1:name user:1:age
1) "zhangsan"
2) "2"
127.0.0.1:6379[3]>                                                                                                                          
```

> getset 先get再set

```bash
127.0.0.1:6379[3]> getset db redis #如果不存在值，则返回nil
(nil)
127.0.0.1:6379[3]> get db
"redis"
127.0.0.1:6379[3]> getset db mongodb #如果存在值，获取原来的值，并设置新的值
"redis"
127.0.0.1:6379[3]> get db
"mongodb"
127.0.0.1:6379[3]> 
```



String类型的使用场景：value除了是我们的字符串还可以是我们的数字。

	- 计数器（阅读数、粉丝数等）
- 统计多单位的数量
- 对象缓存



#### 	list

基本的数据类型，列表。

再redis里面，我们可以把list完成：栈、队列、阻塞队列。

所有的list命令多少以L开头。

> LIST中插入值：LPUSH做插入  RPUSH右插入

```bash
127.0.0.1:6379[3]> keys *
(empty list or set)

127.0.0.1:6379[3]> LPUSH list one #将一个值插入到列表头部（左）
(integer) 1
127.0.0.1:6379[3]> LPUSH list two
(integer) 2
127.0.0.1:6379[3]> LPUSH list three
(integer) 3
127.0.0.1:6379[3]> LRANGE list 0 -1 #获取list的值
1) "three"
2) "two"
3) "one" 
127.0.0.1:6379[3]> LRANGE list 0 1 #通过区间获取具体的值
1) "three"
2) "two"
127.0.0.1:6379[3]> RPUSH list right  #将一个值插入到列表尾部（右)
(integer) 4

127.0.0.1:6379[3]> LRANGE list 0 1
1) "three"
2) "two"
127.0.0.1:6379[3]> LRANGE list 0 -1
1) "three"
2) "two"
3) "one"
4) "right"
127.0.0.1:6379[3]>  
```

> 移除list元素：LPOP RPOP

```bash
127.0.0.1:6379[3]> LRANGE list 0 -1
1) "three"
2) "two"
3) "one"
4) "right"
127.0.0.1:6379[3]> LPOP list # 移除list的第一个元素
"three"
127.0.0.1:6379[3]> RPOP list #移除list的最后一个元素
"right"
127.0.0.1:6379[3]> LRANGE list 0 -1
1) "two"
2) "one"
127.0.0.1:6379[3]> 
```

> list 下标： LINDEX

```bash
127.0.0.1:6379[3]> LRANGE list 0 -1
1) "two"
2) "one"

127.0.0.1:6379[3]> LINDEX list 1 #通过下标获取list中某一个值
"one"
127.0.0.1:6379[3]> LINDEX list 0
"two"
127.0.0.1:6379[3]>   
```

> list 长度：LLEN

```bash
127.0.0.1:6379[3]> LPUSH list 1
(integer) 1
127.0.0.1:6379[3]> LPUSH list 2
(integer) 2
127.0.0.1:6379[3]> LPUSH list 3
(integer) 3
127.0.0.1:6379[3]> LLEN list #返回list的长度
(integer) 3
127.0.0.1:6379[3]>  
```

> 移除指定的值：LREM key count value

```bash
127.0.0.1:6379[3]> LRANGE list 0 -1
1) "3"
2) "3"
3) "2"
4) "1"
127.0.0.1:6379[3]> LREM list 1 1 #移除list集合中指定个数的value，精确匹配
(integer) 1
127.0.0.1:6379[3]> LRANGE list 0 -1
1) "3"
2) "3"
3) "2"
127.0.0.1:6379[3]> LREM list 1 3
(integer) 1
127.0.0.1:6379[3]> LRANGE list 0 -1
1) "3"
2) "2"
127.0.0.1:6379[3]> LPUSH list 3
(integer) 3
127.0.0.1:6379[3]> LREM list 2 3
(integer) 2
127.0.0.1:6379[3]> LRANGE list 0 -1
1) "2"
127.0.0.1:6379[3]>  
```

> 截断list：LTRIM key start stop

```bash
127.0.0.1:6379[3]> RPUSH m1 h1
(integer) 1
127.0.0.1:6379[3]> RPUSH m1 hello1
(integer) 2
127.0.0.1:6379[3]> RPUSH m1 hello2
(integer) 3
127.0.0.1:6379[3]> RPUSH m1 hello3
(integer) 4
127.0.0.1:6379[3]> LTRIM m1 1 2 #通过下标，截取指定的长度，这个list已经被改变了，截断了只剩下截取后的元素
OK
127.0.0.1:6379[3]> LRANGE m1 0 -1
1) "hello1"
2) "hello2"
```



> 移除列表的最后一个元素,并添加到新列表中： RPOPLPUSH source[源列表] destination[新列表]

```bash
127.0.0.1:6379[3]> RPUSH list hello
(integer) 1
127.0.0.1:6379[3]> RPUSH list hello1
(integer) 2
127.0.0.1:6379[3]> RPUSH list hello2
(integer) 3
127.0.0.1:6379[3]> RPOPLPUSH list list2 #移除列表的最后一个元素,并添加到新列表中
"hello2"
127.0.0.1:6379[3]> LRANGE list 0 -1 #查看原列表
1) "hello"
2) "hello1"
127.0.0.1:6379[3]> LRANGE list2 0 -1 #查看新列表
1) "hello2"
127.0.0.1:6379[3]> 
```

> 判断列表存不存在值

```bash
# lset 将列表中指定下标的值替换为另一个值，类似更新操作
127.0.0.1:6379> EXISTS list #判断列表是否存在
(integer) 0
127.0.0.1:6379> lset list 0 v1 #如果不存在列表，更新会报错
(error) ERR no such key
127.0.0.1:6379> lpush list v1
(integer) 1
127.0.0.1:6379> lrange list 0 0
1) "v1"
127.0.0.1:6379> lset list 0 vv1 #如果存在列表，存在下标，更新当前下标的值
OK
127.0.0.1:6379> lrange list 0 0
1) "vv1"
127.0.0.1:6379> lset list 1 vvv1 #如果存在列表，不存在下标，会报错
(error) ERR index out of range
127.0.0.1:6379>
```

> linset ` LINSERT key befor|after plvo value` 往列表前面或后面插入值

```bash
# linsert 将某个具体的value擦汗如到列中莫格具体元素的前面后后面
127.0.0.1:6379> RPUSH list hello
(integer) 1
127.0.0.1:6379> RPUSH list word
(integer) 2
127.0.0.1:6379> LINSERT list befor word aaaa
(error) ERR syntax error
127.0.0.1:6379> LINSERT list before word aaaa
(integer) 3
127.0.0.1:6379> LRANGE list 0 -1
1) "hello"
2) "aaaa"
3) "word"
127.0.0.1:6379> LINSERT list after word bbb
(integer) 4
127.0.0.1:6379> LRANGE list 0 -1
1) "hello"
2) "aaaa"
3) "word"
4) "bbb"
127.0.0.1:6379> 127.0.0.1:6379> RPUSH list hello
127.0.0.1:6379> LRANGE list 0 -1
1) "hello"
2) "aaaa"
3) "word"
4) "bbb"
127.0.0.1:6379>

```

> 小结

- 实际是一个链表，before Node after，left、right都可以插入值
- 如果key存在，新增内容
- 如果key不存在，创建新的链表
- 如果移除了所有的值，空链表，也代表不存在
- 在两边插入或者改动值，效率最高。改动中间元素，效率会偏低一点

可以用来做消息排队，消息队列（Lpush rpop）、栈（lpush lpop）



#### 	set（集合）

set中的值是不能重复的

```bash
127.0.0.1:6379> sadd set hello #set集合中添加元素
(integer) 1
127.0.0.1:6379> sadd set aaa
(integer) 1
127.0.0.1:6379> sadd set luo
(integer) 1
127.0.0.1:6379> SMEMBERS set # 查看指定set集合的所有值
1) "aaa"
2) "luo"
3) "hello"
127.0.0.1:6379> SISMEMBER set luo # 判断set集合是否包含某个元素
(integer) 1
127.0.0.1:6379> SISMEMBER set asd #不包含返回0
(integer) 0
127.0.0.1:6379> SCARD set #获取指定set集合的元素个数
(integer) 3
127.0.0.1:6379>

```

> srem：移除set集合中指定元素

```bash
127.0.0.1:6379> srem set hello #移除set集合中指定元素
(integer) 1
127.0.0.1:6379> scard set
(integer) 2
127.0.0.1:6379> SMEMBERS set
1) "aaa"
2) "luo"
127.0.0.1:6379> 
```

> 随机抽选一个元素：SRANDMEMBER key
>
> set无序不重复

```bash
127.0.0.1:6379> SRANDMEMBER set #随机抽选出一个元素
"luo"
127.0.0.1:6379> SRANDMEMBER set 
"luo"
127.0.0.1:6379> SRANDMEMBER set 
"aaa"
127.0.0.1:6379> SRANDMEMBER set 2 #随机抽选出指定个数的元素
1) "aaa"
2) "luo"
127.0.0.1:6379> 
```

> 随机删除指定的key的某个元素：`spop key`

```bash
127.0.0.1:6379> SMEMBERS set
1) "aaa"
2) "luo"
127.0.0.1:6379> spop set #随机删除指定的key的某个元素
"aaa"
127.0.0.1:6379> SMEMBERS set
1) "luo"
127.0.0.1:6379> 
```

> 将一个指定的元素移动到另一个set集合中`SMOVE source destnation member` 

```bash
127.0.0.1:6379> sadd set a
(integer) 1
127.0.0.1:6379> sadd set b
(integer) 1
127.0.0.1:6379> sadd set c
(integer) 1
127.0.0.1:6379> sadd set2 cc
(integer) 1
127.0.0.1:6379> SMOVE set set2 b #将一个指定的元素移动到另一个set集合中
(integer) 1
127.0.0.1:6379> SMEMBERS set
1) "c"
2) "a"
127.0.0.1:6379> SMEMBERS set2
1) "cc"
2) "b"
127.0.0.1:6379> 
```

> 共同关注（并集）
>
> 数字集合类：
>
> - 差集 `SDIFF key1 key2`
> - 交集  `SINTER key1 key2`
> - 并集 `SUNION key1 key2`

```bash
127.0.0.1:6379> sadd k1 a
(integer) 1
127.0.0.1:6379> sadd k1 b
(integer) 1
127.0.0.1:6379> sadd k1 c
(integer) 1
127.0.0.1:6379> sadd k2 c
(integer) 1
127.0.0.1:6379> sadd k2 d
(integer) 1
127.0.0.1:6379> sadd k2 e
(integer) 1
127.0.0.1:6379> SDIFF k1 k2 #差集
1) "a"
2) "b"
127.0.0.1:6379> SINTER k1 k2 #交集（共同好友）
1) "c"
127.0.0.1:6379> SUNION k1 k2 #并集
1) "a"
2) "c"
3) "b"
4) "d"
5) "e"
127.0.0.1:6379> 
```

微博，a用户将所有关注的人放在一个set集合中，将它的粉丝放在一个集合中。



#### 	hash（哈希，Map集合）

Map集合，key-Map：key-key-value。值是一个map集合!本质贺string类型没用太大区别，还是一个简单的key-value。

set myhash field luo

```bash
127.0.0.1:6379> hset myhash field1 luo #set一个具体key-value
(integer) 1
127.0.0.1:6379> hget myhash field1 #获取一个字段值
"luo"
127.0.0.1:6379> hmset myhash field1 hello field2 world #set多个key-value
OK
127.0.0.1:6379> hmget myhash field1 field2 #获取多个字段值
1) "hello"
2) "world"
127.0.0.1:6379> hgetall myhash #获取全部的数据
1) "field1"
2) "hello"
3) "field2"
4) "world"
127.0.0.1:6379> HDEL myhash field1 #删除hash指定key字段，对应的value值也就删除了
(integer) 1
127.0.0.1:6379> HGETALL myhash
1) "field2"
2) "world"
127.0.0.1:6379> 

```

> 获取hash表的字段数量 `HLEN key`

```bash
127.0.0.1:6379> HLEN myhash
(integer) 1
127.0.0.1:6379> HMSET myhash field1 heelll filed2 afsd
OK
127.0.0.1:6379> HGETALL myhash
1) "field2"
2) "world"
3) "field1"
4) "heelll"
5) "filed2"
6) "afsd"
127.0.0.1:6379> HLEN myhash
(integer) 3
127.0.0.1:6379> 

```

> 判断hasj中指定字段是否存在 `HEXISTS key filed`

```bash
127.0.0.1:6379> HEXISTS myhash field1 #判断hash中指定字段是否存在
(integer) 1
127.0.0.1:6379> HEXISTS myhash field3
(integer) 0
127.0.0.1:6379> 

```

> 只获得所有field `HKEYS key`
>
> 只获得所有value `HVALS key`

```bash
127.0.0.1:6379> HKEYS myhash #只获得所有field
1) "field2"
2) "field1"
3) "filed2"
127.0.0.1:6379> HVALS myhash #只获得所有value
1) "world"
2) "heelll"
3) "afsd"
127.0.0.1:6379> 
```

> incr 
>
> decr

```bash
127.0.0.1:6379> hset myhash field3 5 #指定增量
(integer) 1
127.0.0.1:6379> HINCRBY myhash field3 1
(integer) 6
127.0.0.1:6379> HINCRBY myhash field3 -1
(integer) 5
127.0.0.1:6379> HSETNX myhash field4 hello #如果不存在则可以设置
(integer) 1
127.0.0.1:6379> HSETNX myhash field4 h111 #如果存在则不能设置
(integer) 0
127.0.0.1:6379> 
```



hash变更的数据 user name age ，尤其是用户信息之类的，经常变动的信息。hash更适合对象的存储，而string跟适合字符串存储。



#### 	zset（有序集合）

在set的基础上，增加了一个值，set k1 v1  zset k1 score1 v1

> 添加 `ZADD key`

```bash
127.0.0.1:6379> ZADD myset 1 one #添加一个值
(integer) 1
127.0.0.1:6379> ZADD myset 2 two
(integer) 1
127.0.0.1:6379> ZADD myset 3 three 4 fore #添加多个值
(integer) 2
127.0.0.1:6379> zrange myset 0 -1
1) "one"
2) "two"
3) "three"
4) "fore"
127.0.0.1:6379> 
```

> 排序如何实现

```bash
127.0.0.1:6379> ZADD salary 2000 zhangsan #添加三个用户
(integer) 1
127.0.0.1:6379> ZADD salary 3000 lisi
(integer) 1
127.0.0.1:6379> ZADD salary 1000 wangwu
(integer) 1
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf #显示全部的用户，按照从小到大排序
1) "wangwu"
2) "zhangsan"
3) "lisi"
127.0.0.1:6379> ZREVRANGE salary 0 -1 #从大到小排序
1) "lisi"
2) "zhangsan"
127.0.0.1:6379> 

127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf withscores #显示全部的用户并且附带成绩
1) "wangwu"
2) "1000"
3) "zhangsan"
4) "2000"
5) "lisi"
6) "3000"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf 2000 withscores #显示小于2000的升序排列，
1) "wangwu"
2) "1000"
3) "zhangsan"
4) "2000"
127.0.0.1:6379> 
```

> 移除rem中的元素 `ZREM key member`
>
> 获取有序集合中的个数：`ZCARD key`

```bash
127.0.0.1:6379> zrange salary 0 -1
1) "wangwu"
2) "zhangsan"
3) "lisi"
127.0.0.1:6379> ZREM salary wangwu #移除元素
(integer) 1
127.0.0.1:6379> zrange salary 0 -1
1) "zhangsan"
2) "lisi"
127.0.0.1:6379> ZCARD  salary #获取有序集合中的个数
(integer) 2
127.0.0.1:6379> 
```

> 获取指定区间的元素数量 `ZCOUNT key start end`

```bash
127.0.0.1:6379> ZADD myset 1 hh 2 ll 3 eee
(integer) 3
127.0.0.1:6379> ZCOUNT myset 1 3
(integer) 3
127.0.0.1:6379> ZCOUNT myset 1 2 #获取指定区间的元素数量
(integer) 2
127.0.0.1:6379> 
```



### 三种特殊数据类型

#### 	geospatial（地理位置）

朋友定位，附件的人，打车距离计算。

redis的geo在redis3.2版本就推出了。此功能可以推算地理位置的信息，两地之间的距离，方圆几里的人。

>GEOADD
>
>GEODIST
>
>GEOHASH
>
>GEOPOS
>
>GEORADIUS
>
>GEORADIUSBYMEMBER

> GEOADD:添加地理位置数据

```bash
#规则：南北两极无法直接添加，我们一般会下载城市数据，直接通过java程序一次性导入。
#参数： key 值（纬度、经度）
#注意经纬度：
#有效的经度：-180度到180度
#有效的纬度：-85.05112878度到85.05112878度
#当坐标位置超出指定范围时，该命令将会返回一个错误：
#127.0.0.1:6379> GEOADD china:city 39.90 116.40 beijing
#(error) ERR invalid longitude,latitude pair 39.900000,116.400000

127.0.0.1:6379> GEOADD china:city 116.40 39.90 beijing
(integer) 1
127.0.0.1:6379> GEOADD china:city 121.47 31.23 shanghai
(integer) 1
127.0.0.1:6379> GEOADD china:city 106.50 29.53 chongqin 114.05 22.52 shenzheng 120.16 30.24 hangzhou 108.96 34.26 xian
(integer) 4
127.0.0.1:6379> 
```

> 获得当前定位，返回坐标：`GEOPOS key member`

```bash
127.0.0.1:6379> GEOPOS china:city  beijing chongqin #获取指定城市的经纬度
1) 1) "116.39999896287918091"
   2) "39.90000009167092543"
2) 1) "106.49999767541885376"
   2) "29.52999957900659211"
127.0.0.1:6379> 

```

> 两点之间的距离：`GEODIST key member`

单位：

- m米
- km千米
- mi英里
- ft英尺

```bash
127.0.0.1:6379> GEODIST china:city beijing shanghai #两点之间的直线距离单位米
"1067378.7564"
127.0.0.1:6379> GEODIST china:city beijing shanghai km #指定单位
"1067.3788"
127.0.0.1:6379> 
```

> 以给定的经纬度为中心，找出某一半径内的元素`GEORADIUS`

#附近的人：首先要获得所有附近的人的地址，定位。通过半径来查询。

```bash
127.0.0.1:6379> GEORADIUS china:city 119.11 30.11 1000 km #寻找中心点方圆1000km内的城市，需要先录入城市点信息
1) "shenzheng"
2) "hangzhou"
3) "shanghai"
127.0.0.1:6379> GEORADIUS china:city 119.11 30.11 1000 km withdist #显示距中心点距离和名称
1) 1) "shenzheng"
   2) "983.1125"
2) 1) "hangzhou"
   2) "101.9920"
3) 1) "shanghai"
   2) "257.8533"
127.0.0.1:6379> GEORADIUS china:city 119.11 30.11 1000 km withcoord #显示名称与经纬度
1) 1) "shenzheng"
   2) 1) "114.04999762773513794"
      2) "22.5200000879503861"
2) 1) "hangzhou"
   2) 1) "120.1600000262260437"
      2) "30.2400003229490224"
3) 1) "shanghai"
   2) 1) "121.47000163793563843"
      2) "31.22999903975783553"
127.0.0.1:6379> GEORADIUS china:city 119.11 30.11 1000 km withdist withcoord count 2 #筛选出指定数量的结果
1) 1) "hangzhou"
   2) "101.9920"
   3) 1) "120.1600000262260437"
      2) "30.2400003229490224"
2) 1) "shanghai"
   2) "257.8533"
   3) 1) "121.47000163793563843"
      2) "31.22999903975783553"
127.0.0.1:6379> 
```



> 找出指定名称周围的其他元素`GEORADIUSBYMEMBER china:city beijing 1000 km`

```bash
#找出位于指定元素周围的其他元素
127.0.0.1:6379> GEORADIUSBYMEMBER china:city beijing 1000 km
1) "beijing"
2) "xian"
127.0.0.1:6379> 
```

> 返回一个或多个位置元素的geohash表示形式：`GEOHASH key member`

```bash
#将二维的经纬度转为一纬的字符串，如果两个字符串越接近，那么距离越近。
127.0.0.1:6379> GEOHASH china:city beijing chongqin
1) "wx4fbxxfke0"
2) "wm5xzrybty0"
127.0.0.1:6379> 
```

> GEO底层的实现原来其实是Zset，可以使用zset命令来操作geo

```bash
#查看地图中全部元素
127.0.0.1:6379> ZRANGE china:city 0 -1
1) "chongqin"
2) "xian"
3) "shenzheng"
4) "hangzhou"
5) "shanghai"
6) "beijing"

#移除元素
127.0.0.1:6379> ZREM china:city beijing
(integer) 1
127.0.0.1:6379> ZRANGE china:city 0 -1
1) "chongqin"
2) "xian"
3) "shenzheng"
4) "hangzhou"
5) "shanghai"
127.0.0.1:6379>
```



#### 	hyperloglog

> 简介

redis2.8.9版本更新了hyperloglog数据结构

redis hyperloglog基数统计算法。

优点：占用的内存是固定的，2^64不同的元素的基数，只需要使用12kb的内存。如果要从内存角度比较的话，hyperloglog首选。

**网页的uv（一个人访问一个网站多次，但是还是算作一个人！）**

传统的方式，set保存用户的id，然后就可以统计set中的元素数量作为标准判断。

此方式如果保存大量的用户id，就会比较麻烦，我们的目的是为了技术，而不是保存用户id；

kyperloglog官方说具有0.81%的错误率。

```bash
#创建第一组元素 mykey
127.0.0.1:6379> PFADD mykey s a f d f g h j 
(integer) 1

#统计 mykey 元素的基数数量
127.0.0.1:6379> PFCOUNT mykey
(integer) 7

#创建第二组元素mykey2
127.0.0.1:6379> PFADD mykey2 q w e r t y f g
(integer) 1

#合并两组 mykey mykey2 =》mykey3 并集
127.0.0.1:6379> PFMERGE mykey3 mykey mykey2
OK

#看并集的数量
127.0.0.1:6379> PFCOUNT mykey3
(integer) 12
127.0.0.1:6379> 
```

如果允许容错，使用hyperloglog

如果不允许容错，就是要set或者自己的数据类型即可。



#### 	bitmap

> 位运算

统计用户信息：活跃，不活跃；登录、未登录。状态类的都可以使用bitmap位图，是一种数据结构。操作魏晋至位来进行记录，只有0和1两个状态

> 测试使用
>
> 使用bitmaps来记录是否在线状态

```bash
127.0.0.1:6379> SETBIT sign 0 1
(integer) 0
127.0.0.1:6379> SETBIT sign 1 0
(integer) 0
127.0.0.1:6379> 
127.0.0.1:6379> SETBIT sign 2 1
(integer) 0
127.0.0.1:6379> SETBIT sign 1 0
(integer) 0
127.0.0.1:6379> SETBIT sign 3 1
(integer) 0
127.0.0.1:6379> SETBIT sign 4 0
(integer) 0
127.0.0.1:6379> SETBIT sign 5 1
(integer) 0
127.0.0.1:6379> SETBIT sign 6 0
(integer) 0
127.0.0.1:6379> 
```

> 查看在线状态 `GETBIT key member`

```bash
127.0.0.1:6379> GETBIT sign 3
(integer) 1
127.0.0.1:6379> GETBIT sign 6
(integer) 0
127.0.0.1:6379>
```

> 统计操作，统计在线离线 `BITCOUNT key`

```
127.0.0.1:6379> BITCOUNT sign 
(integer) 4
127.0.0.1:6379> 

```



### 事务

redis事务本质：一组命令的集合，一个事务中的所有命令都会被序列化，在事务执行过程中，会被按照顺序执行

一次性，顺序性、排他性，执行一系列的命令

redis事务没有隔离级别的概念

所有的命令在事务中，并没有直接被执行，只有发起执行命令的时候才会执行。exec

redis单条命令是保证原子性的，但是事务时不保证原子性的；同时成功，或同事失败，原子性。

redis的事务：

- 开启事务（MULTI）
- 命令入队（...）
- 执行事务（exec）

> 正常执行事务

```bash
#开启事务
127.0.0.1:6379> MULTI
OK
#命令入队
127.0.0.1:6379(TX)> set k1 v1
QUEUED
127.0.0.1:6379(TX)> set k2 v2
QUEUED
127.0.0.1:6379(TX)> set k3 v3
QUEUED
127.0.0.1:6379(TX)> get k3
QUEUED
#执行事务
127.0.0.1:6379(TX)> exec
1) OK
2) OK
3) OK
4) "v3"
127.0.0.1:6379> 
```



> 放弃事务



```bash
#开启事务
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379(TX)> set k1 v1
QUEUED
127.0.0.1:6379(TX)> set k2 v3
QUEUED
127.0.0.1:6379(TX)> set k4 v4
QUEUED

#取消事务
127.0.0.1:6379(TX)> DISCARD
OK
#事务队列中的命令都不会被执行
127.0.0.1:6379> get k4
(nil)
127.0.0.1:6379> 
```



> 编译型异常（代码有问题，命令有错）事务中所有的命令都不会被执行

```bash
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379(TX)> set k1 v1
QUEUED
127.0.0.1:6379(TX)> set k2 v2
QUEUED

#错误命令
127.0.0.1:6379(TX)> getset k3
(error) ERR wrong number of arguments for 'getset' command
127.0.0.1:6379(TX)> set k4 v4
QUEUED

#执行事务报错，所有命令都不会执行
127.0.0.1:6379(TX)> exec
(error) EXECABORT Transaction discarded because of previous errors.
127.0.0.1:6379> 
```





> 运行时异常（1/0），如果事务队列中存在语法错误，那么执行命令的时候，其他命令是可以正常执行的，错误命令会抛出异常

```bash
127.0.0.1:6379> set k1 "v1"
OK
127.0.0.1:6379> multi
OK

#会执行失败
127.0.0.1:6379(TX)> incr k1
QUEUED
127.0.0.1:6379(TX)> set k2 v2
QUEUED
127.0.0.1:6379(TX)> set k3 v3
QUEUED
127.0.0.1:6379(TX)> get k3
QUEUED
127.0.0.1:6379(TX)> exec
#虽然第一条命令报错了，但是依旧正常执行其他命令。
1) (error) ERR value is not an integer or out of range
2) OK
3) OK
4) "v3"
127.0.0.1:6379> get k2
"v2"
127.0.0.1:6379> 
```



> 监控 `watch`

悲观锁：

- 很悲观，什么时候都会出问题，无论做什么都会加锁，影响性能

乐观锁：

- 很乐观，认为什么时候都不会出问题，所以不会上锁，更新数据的时候去判断一下，在此期间是否有任修改过这个数据，
- 获取version
- 跟新的时候比较version

> redis监控测试

```bash
127.0.0.1:6379> set money 100
OK
127.0.0.1:6379> set out 0
OK

#监视money对象
127.0.0.1:6379> watch money 
OK
#事务正常结束，数据没有发生变动，这个时候就正常执行成功
127.0.0.1:6379> MULTI 
OK
127.0.0.1:6379(TX)> DECRBY money 20
QUEUED
127.0.0.1:6379(TX)> INCRBY out 20
QUEUED
127.0.0.1:6379(TX)> exec
1) (integer) 80
2) (integer) 20
127.0.0.1:6379> 
```



多线程修改值时，使用watch可以当redis的乐观锁操作。执行exec钱，另一个线程修改值后，会导致修改失败。



### jedis

我们要使用java来操作redis

> jedis时reids官方推荐的java连接开发工具，使用java操作redis中间件，如果你要使用java操作redis，那么一定要熟悉jedis



> 测试

1、导入依赖

```java
 <dependencies>
        <!--导入jedis依赖-->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>3.5.1</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.73</version>
        </dependency>

    </dependencies>
```

2、编码测试：

- 连接数据库
- 操作命令
- 断开连接

```java
public class TestPing {
    public static void main(String[] args) {
        // 1、 new jedis 对象
        Jedis jedis = new Jedis("127.0.0.1",6379);
        //jedis所有命令就是redis指令
        System.out.println(jedis.ping());
    }
}
```



#### 常用api

string

list

set

hash

zset



### springboot整合

springboot2.x之后，jedis被替换为lettuce

jedis：采用直连，多线程操作的话不安全，如果想要避免不安全，使用jedis pool连接池。BIO模式

lettuce：采用netty，实力可以在多个线程中进行共享。不存在线程不安全。可以减少线程数量。NIO模式



> 源码分析

```java
	@Bean
	@ConditionalOnMissingBean(name = "redisTemplate") //我们可以自己定义一个 redistemplate来替换默认的。
	@ConditionalOnSingleCandidate(RedisConnectionFactory.class)
	public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        //默认的redistemplat 没有过多的设置，redis对象都是需要序列化
        //两个泛型都是object，object 的类型，我们后面使用需要强制转换<string,Object>
		RedisTemplate<Object, Object> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory);
		return template;
	}

	@Bean
	@ConditionalOnMissingBean //由于string类型是我们最常使用的类型，所以单独提出一个been
	@ConditionalOnSingleCandidate(RedisConnectionFactory.class)
	public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
		StringRedisTemplate template = new StringRedisTemplate();
		template.setConnectionFactory(redisConnectionFactory);
		return template;
	}
```



> 整合测试

1、导入依赖

```xml
 <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
        </dependency>
```



2、配置连接

```java
spring:
  redis:
    host: 127.0.0.1
    port: 6379
```



3、测试使用

```java
package com.luo.springbootredis;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
class SpringbootRedisApplicationTests {


    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    void contextLoads() {

        // redisTemplate.opsForValue 操作string
        // redisTemplate.opsForList 操作list
        // redisTemplate.opsForGeo 操作geo
        // redisTemplate.opsForZSet 操作zset
        // redisTemplate.opsForSet 操作set
        // redisTemplate.opsForHash 操作hash
        // redisTemplate.opsForHyperLogLog 操作opsForHyperLogLog

        //获取连接对象
//        RedisConnection connection = redisTemplate.getConnectionFactory().getConnection();
//        connection.flushAll();
//        connection.flushDb();


    }

}
```



### redis.conf配置详解

启动时，通过配置文件来启动。

> 1、配置文件unit单位大小写不敏感

```bash
#
# 1k => 1000 bytes
# 1kb => 1024 bytes
# 1m => 1000000 bytes
# 1mb => 1024*1024 bytes
# 1g => 1000000000 bytes
# 1gb => 1024*1024*1024 bytes
#
# units are case insensitive so 1GB 1Gb 1gB are all the same.

```



> 可以包含多个配置文件

```bash
# include /path/to/local.conf
# include /path/to/other.conf
```



> NETWORK 网络

```bash
bind 127.0.0.1 #绑定ip
protected-mode yes #是否受保护模式
port 6379 #端口设置
```



> 通用配置 GENERAL

```bash
daemonize yes #已守护进程开启，默认是no，需要修改为yes

#如果是已后台方式运行，我们需要指定一个pid文件
pidfile /var/run/redis_6379.pid

#日志级别
# Specify the server verbosity level.
# This can be one of:
# debug (a lot of information, useful for development/testing) 
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably)生成环境适用
# warning (only very important / critical messages are logged)
loglevel notice

#日志文件位置名
logfile ""

#数据库数量，默认16个
databases 16

#是否总是显示logo
always-show-logo no
```



> 快照 SNAPSHOTTING

持久化，在规定时间内，执行力多少次操作，则会持久化到文件 .rdb .aof

redis是内存数据库，没有持久化，那么数据断电既失

```bash
#如果900秒内，如果只是有一个key进行了修改，我们就进行持久化操作
# save 3600 1
#如果300秒内，如果只是有100个key进行了修改，我们就进行持久化操作
# save 300 100
#如果60秒内，如果只是有10000个key进行了修改，我们就进行持久化操作
# save 60 10000

#我们可以自定义持久化时间

#持久化如果出错，是否还要继续工作
stop-writes-on-bgsave-error yes

#是否压缩rdb文件，需要消耗一些cpu资源
rdbcompression yes

#保存rdb文件时，进行错误的检查校验
rdbchecksum yes

# .rdb文件保存的目录
dir ./

```



> REPLICATION 复制，主从复制使用





> SECURITY 安全

```bash
#设置密码两种方式
#配置文件方式：
requirepass 123456
#命令方式
127.0.0.1:6379> CONFIG GET requirepass #查看密码
1) "requirepass"
2) ""
127.0.0.1:6379> CONFIG SET requirepass "123456" #设置密码
OK
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> CONFIG GET requirepass
1) "requirepass"
2) "123456"
127.0.0.1:6379> auth 123456 #验证密码
OK
127.0.0.1:6379> 
```



> 限制 CLIENTS连接数

```bash
#设置能连接上的最大客户端数量
# maxclients 10000
#最大内存量
# maxmemory <bytes>

#内存达到上限后的处理策略
# maxmemory-policy noeviction
	1、volatile-lru：只对设置了过期时间的key进行LRU（默认值） 

	2、allkeys-lru ： 删除lru算法的key   

	3、volatile-random：随机删除即将过期key   

	4、allkeys-random：随机删除   

	5、volatile-ttl ： 删除即将过期的   

	6、noeviction ： 永不过期，返回错误
```



> aof配置 APPEND ONLY MODE 

```bash
#默认时不开启aof模式的，默认是使用rdb模式持久化的，在大部分的情况下，rdb完全够用
appendonly no 	

#持久化的文件名
appendfilename "appendonly.aof"

#同步
# appendfsync always #每次修改都会sync，小号性能
appendfsync everysec ##每秒执行一次sync，可能会丢失这1s的数据
# appendfsync no #不执行sync，这个时候操作系统自己同步数据，速度最快
```





### redis持久化

redis是内存数据库，如果不讲内存周给的数据库状态保存到磁盘，那么一旦服务器进程推出，服务器中的数据库状态也会消失，所以redis提供了持久化功能。

#### 	RDB（redis database）

> 什么是RDB

在主从复制中，rdb一般放在从机上面做备用，几乎不会使用。



![image-20210311101335532](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210311101335532.png)

在指定的时间间隔内，将内存中的数据集快照写入磁盘，也就是Snapshot快照，它恢复时是将快照文件直接读到内存里。

redis会单独创建（fork）一个子进程来进行持久化，会先将数据写入到一个临时文件中，持久化过程都结束后，在用这个临时文件替换上次持久化好的文件，整个过程中，主进程是不进行任务IO操作的。这就确保了极高的性能。如果需要进行大规模数据的恢复，但对于数据恢复的完整性不是非常敏感，那RDB方式要比AOF方式更加的高效，RDB的缺点是最后一次持久化的数据可能丢失。默认是用RDB，一般情况下不需要修改这个配置。

在生产环境下，需要将dump.rdb文件进行备份。



**rdb保存的文件，`dump.rdb`**,在配置文件中的snapshot中配置

```bash
dbfilename dump.rdb
```

> 自定义rdb操作规则

```bash
save 60 5 #60s没进行5此操作
```

> 触发机制

1、save的规则满足的情况下，会自动触发rdb规则，在`/usr/local/bin`目录下生成dump.rdb 文件

2、执行fiushall命令，也会触发我们的rdb规则。

3、推出redis，也会出发rdb规则，生成edb文件。



> 如何回复rdb文件

1、只需要将dump.rdb文件放到redis启动目录下，redis启动时会自动检查dump.rdb文件，恢复其中的数据。

2、查看位置

```bash
127.0.0.1:6379> CONFIG GET dir
1) "dir"
2) "/usr/local/bin" #如果这个目录下存在dump.rdb文件，启动会自动回复其中的数据
```



> 使用默认配置基本可以满足



优点：

- 适合大规模的数据回复。
- 如果对数据完整性要求不高

缺点：

- 需要一定的时间间隔进行操作，如果redis意外宕机了，最后一次修改的额数据就丢失了。
- fork进程的时候，会占用一定的内存空间。



#### 	AOF（Append Only File）

将我们的所有命令都记录下来，恢复时将这个文件全部再执行一遍。



![image-20210311105626695](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210311105626695.png)



以日志的形式来记录每个写操作，将redis执行过的所有指令记录下（读操作不记录），只许追加文件但不可以改写文件，redis启动之初会读取该文件重新构建数据，换言之，redis重启的话就根据日志文件的内容将写指令从前到后执行一次完成数据恢复。

**aof保存的是appendonly.aof文件**



> 配置文件修改

```bash
#默认不开启 no，需要手动修改配置文件开始
appendonly yes 
```

shutdown重启redis，`/usr/local/bin`目录下会生成`appendonly.aof`文件



如果appendonly.aof配置文件有错误，redis是无法启动的，我们需要使用redis提供的`redis-check-aof --fix appendonly.aof`  来修复。

```bash
#默认时不开启aof模式的，默认是使用rdb模式持久化的，在大部分的情况下，rdb完全够用
appendonly no 	

#持久化的文件名
appendfilename "appendonly.aof"

#同步
# appendfsync always #每次修改都会sync，小号性能
appendfsync everysec ##每秒执行一次sync，可能会丢失这1s的数据
# appendfsync no #不执行sync，这个时候操作系统自己同步数据，速度最快
```



> appendonly.aof文件重写规则

```bash
no-appendfsync-on-rewrite no

auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

```

**aof默认是文件无限追加，文件会越来越大。当aof文件大于64M，就有fork一个新进程来将文件进行重新。**







优点：

- 每次修改都同步，文件完整性会更好。
- 每秒同步一次，可能会丢失一秒数据
- 从不同步，效率最高。

缺点：

- 相对于数据文件来说，aof文件远远大于rdb，恢复的速度回避rdb慢
- aof运行效率比rdb慢，所以redis默认配置采用rdb持久化。



**扩展**

1、RDB持久化方式能够在指定的时间间隔内对你的数据进行快照存储

2、AOF持久化方式记录每次对服务器的操作，放服务器重启的时候，会执行这些命令恢复原始数据，AOF命令以redis协议追加保存每次的写操作到文件末尾，redis还能对AOF文件今昔后台重写，使得AOF文件体积不至于过大。

**3、只做缓存，如果你只希望你的数据在服务器运行的时候存在，你也可以不使用任何持久化**

4、同时开启两种持久化方法

- 在这种情况下，当redis重启的时候会优先载入AOF文件来恢复原始数据，因为在通常情况下AOF文件保存的数据集要比RDB文件保存的数据集完整。
- RDB的数据不实时，同时使用两者时服务器重启也只会找AOF文件，那要不要值使用AOF呢？建议不要，因为RDB更适合用于备份数据库（AOF在不断变化不好备份），快速重启，而且不会有AOF可能潜在的bug，留着最为万一的手段。

5、性能建议

- 因为EDB文件只能用作后背用途，建议旨在alave上持久化RDB文件，而且只要15分钟备份一次就够了，只保留save 99 1这条规则。
- 如果Enable AOF，好处时在最恶劣的情况下也只会丢失不超过两秒的数据，启动脚本较简单只load自己的AOF文件就可以了，代价一是带来了持续的IO,二十AOF rewriter的最后将rewriter过程中产生的新数据写到新的文件造成阻塞几乎不可避免，只要硬盘许可，应该是尽量减少AOF rewriter的频率，AOF重写的基础大小默认值64M太小了，可以设置到5G以上，默认超过原大小100%大小重写可以改为适当数值。
- 如果不Eable AOF，仅靠Master-Slave Repilcation实现高可用性也可以，能省掉一大笔IO，也减少了rewriter时代了的系统波动，代价时如果Maser/Slave同时宕机，会丢失十几分钟的数据，启动脚本也要比较两个Master/Slave中的RDB文件，载入较新的那个，微博就是这种架构。





### redis实现订阅发布



redis发布订阅（pub/sub）是一种消息通信模式；发送者（pub）发送消息，订阅者（sub）接收消息。

redis客户端可以订阅任意数据的频道。

订阅/发布消息图：

![image-20210311114906664](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210311114906664.png)



> 订阅端 `SUBSCRIBE channel `

```bash
127.0.0.1:6379> SUBSCRIBE luo
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "luo"
3) (integer) 1
1) "message"
2) "luo"
3) "sjkdfs"
1) "message"
2) "luo"
3) "1231241"
```



> 发送端 `PUBLISH channel message`

```bash
127.0.0.1:6379> PUBLISH luo "sjkdfs"
(integer) 1
127.0.0.1:6379> PUBLISH luo "1231241"
(integer) 1
127.0.0.1:6379> 
```



> 原理

redis是使用C实现的，通过分析redis源码里的pubsub.c文件了解发布和订阅机制的底层实现，藉此加深对redis的理解

redis通过PUBLISH、SUBSCRIBE和 PSUBSCRIBE等命令实现发布订阅功能。

通过SUBSCRIBE命令向订阅频道后，redis-server里维护了一个字典，子弟啊的键就是一个个channel，而字典的值则是一个链表。链表中保存了所有订阅这个channel的客户端，SUBSCRIBE命令的关键，就是将客户端添加到给定的channel的订阅链表中。

通过PUBLISH命令向订阅者发送消息，redis-server会使用给定的频道作为键，在他所维护的channel字典中查找记录了订阅这个频道的所有的客户端的链表，遍历这个链表，将消息发布给所有的订阅者。

pub/sub从字面上理解就是发布（publish）与订阅（subscribe），在redis中，你可以设定对某一个key值进行消息发布及消息订阅，当一个key值上进行了消息发布后，所有订阅它的客户端都会收到相应的消息。这一功能最明显的用法就是用作实时消息系统，比如普通的及时聊天，群聊等功能。



使用场景：

1、实时消息系统。

2、实时聊天

3、订阅、关注系统

复杂场景使用消息中间件。



### reds主从复制

#### 概念

主从复制，是指将一台reids服务器的数据，复制到其他的redis服务器。前者称为主节点（master/leader），后者称为从节点（slave/follower），数据的复制时单向的，只能由主节点到从节点。master以写为主，slave已读为主。

默认情况下，每台redis服务器都是主节点；且一个主节点可以有多个从节点（或没有从节点），但一个从节点只能有一个主节点。‘主从复制的作用主要包括：

1、数据冗余：主从复制实现了数据热备份，是持久化之外的一种数据冗余方式。

2、故障恢复：当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复；实际上时一种服务的冗余。

3、负载均衡：在主从复制的基础上，配合读写分离，可以由主节点提供写服务，由从节点提供读服务（即写redis数据时应用连接主节点，读redis数据时应用连接从节点），分担服务器负载；尤其是在写少读多的情况下，通过多个从节点分担读负载，可以大大提高redis服务器的并发量。

4、高可用基石：除了上述作用外，主从复制还是哨兵和集群能够实施的基础，因此说主从复制时redis高可用的基础。



一般来说，要将redis运用于工程项目中，只使用一台redis时万万不能的，原因如下：

1、从结构上，单个redis服务器会发生单点故障，并且一台服务器需要处理所有的请求负载，压力较大；

2、从容量上，单个redis服务器内存容量有限，就算一台redis服务器内存容量为256g，也不能将所有内存用作redis存储内存，单台redis服务器最大使用内存不应该超过20g。

电商网站上的商品，一般都是一次上次，无数次浏览的，多读少写。



#### 环境配置

只配置从库，不用配置主库

1、#查看当前库的信息

```bash
#查看当前库的信息
127.0.0.1:6379> info replication 
# Replication
role:master #角色 master
connected_slaves:0 #没有从机
master_failover_state:no-failover
master_replid:7f451c60ae02f8681a0826f4c3ce00cce72cfecb
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
127.0.0.1:6379> 
```



2、复制三个配置文件`redis79.conf  redis80.conf  redis81.conf  redis.conf`，修改对应的信息

1、端口`port`：6379、6380、6381

2、pid名字`pidfile /var/run/redis_6381.pid`

3、log文件名字 `logfile "6381.log"`

4、dump.rdb文件名 `dbfilename dump6381.rdb`



3、启动三个redis

```bash
redis-server redisconfig/redis79.conf
redis-server redisconfig/redis80.conf
redis-server redisconfig/redis81.conf

root@deployment:/usr/local/bin# ps -ef|grep redis
root       5604      1  0 06:43 ?        00:00:00 redis-server 127.0.0.1:6379
root       5612      1  0 06:43 ?        00:00:00 redis-server 127.0.0.1:6380
root       5618      1  0 06:43 ?        00:00:00 redis-server 127.0.0.1:6381

```



#### 一主二从

默认情况下，每台redis服务器都是主节点，只要配置从机就好。

一主（79）二从（80、81）

配置从机 `SLAVEOF host port`：

```bash
127.0.0.1:6380> SLAVEOF 127.0.0.1 6379
OK
127.0.0.1:6380> info replication
# Replication
role:slave #从机
master_host:127.0.0.1
master_port:6379
master_link_status:up
master_last_io_seconds_ago:5
master_sync_in_progress:0
slave_repl_offset:14
slave_priority:100
slave_read_only:1
connected_slaves:0
master_failover_state:no-failover
master_replid:e6f3ef2d480f0cf54c15e5ef7f16abb67e0d734b
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:14
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:14
127.0.0.1:6380> 


#主机中信息
127.0.0.1:6379> info replication
# Replication
role:master
connected_slaves:2 #两个从机
slave0:ip=127.0.0.1,port=6380,state=online,offset=56,lag=1
slave1:ip=127.0.0.1,port=6381,state=online,offset=56,lag=0
master_failover_state:no-failover
master_replid:e6f3ef2d480f0cf54c15e5ef7f16abb67e0d734b
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:70
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:70
127.0.0.1:6379> 
```

以上为命令配置方式，命令方式配置是暂时的。



**配置文件配置方式** `# replicaof <masterip> <masterport>`：

```bash
replicaof 127.0.0.1 6379

##当主机有密码时，配置主机密码
# masterauth <master-password>

```



> 注意

主机可以写，从机只能读不能写。从机中所有数据，都会自动被从机保存。

```bash
#从节点只能读不能写
127.0.0.1:6381> keys *
1) "k1"
127.0.0.1:6381> get k1
"v1"
127.0.0.1:6381> set k2 v2
(error) READONLY You can't write against a read only replica.
127.0.0.1:6381> 

```



当主机宕机后，从机依旧连接到主机，但是没有缬草了，这时，如果主机恢复了，从机依旧可以直接获取到足迹写的信息。

如果是使用命令行来配置的主从，当从机重启了，就会变为主机。只要再次配置为从机，就会从主机中获取值。

> 复制原理

Slave启动成功连接到master后会发送一个sync同步命令

master接到命令，启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令，在后台进程执行完毕后，master将传送整个数据文件到slave，并完成一次完全同步。

- 全量复制：而Slave服务在接受到数据库文件数据后，将其存盘并加载到内存中。
- 增量复制：Master继续将新的所有收集到的修改命令依次传给slave，完成同步

但是只要是重新连接master，一次完全同步（全量复制）将被自动执行。



> 手动变成主节点 `SLAVEOF no one`

当主机彻底宕机，可以使用`SLAVEOF no one`让自己变成主机，其他节点就可以手动连接到最新的主节点



### redis哨兵模式(重点：自动选举主节点)

> 概述

主从切换技术方法是：当主服务器宕机后，需要手动把一台从服务器切换为主服务器，需要人工干预，会造成一段时间内服务不可用。所以，更多时候，我们优先考虑哨兵模式。redis从2.6开始正式提供了sentinel（哨兵）架构来解决这个问题。

能够后台监控主机是否故障，如果故障了根据投票数自动将从库转为主库。

哨兵模式是一种特殊模式，首先redis提供了哨兵的命令，哨兵是一个独立的进程，作为进程，他会独立运行，其原理是**哨兵通过发送命令，等待redis服务器响应，从而监控运行的多个redis实例。**

![image-20210311153617762](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210311153617762.png)



这里的哨兵有两个作用

- 通过发送命令，让redis服务器返回监控其运行状态，包括主服务器和从服务器。
- 当哨兵检测到master宕机，会自动将slave切换为master，然后通过发布订阅模式通知其他的从服务器，修改配置文件，让它们切换主机。

然而一个哨兵进程对redis服务器进行监控，可能会出现问题，为此，我们可以使用多个哨兵进行监控，各个哨兵之间还会进行监控，这样就形成了多哨兵模式。

![image-20210311153738036](C:\Users\65196\AppData\Roaming\Typora\typora-user-images\image-20210311153738036.png)



假设主服务器宕机，哨兵1先检测到这个结果，系统并不会马上进行failover过程，仅仅是哨兵1主观的认为主服务器不可用，这个现象称为**主观下线**，当后面的哨兵也检查到主服务器不可用，并且数量达到一定值时，那么哨兵之间就会进行一次投票，投票结果由一个哨兵发起，进行failover（故障转移）操作，切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的从服务器实现切换主机，这个过程称为**客观下线**。



> 配置哨兵

1、新键配置文件`/usr/local/bin/redisconfig/sentinel.conf`

```bash
#sentinel monitor [被监控的名称] host port 1
sentinel monitor myredis 127.0.0.1 6379 1
```

后面的数字1，代表主机挂了，slave投票看让谁接替成为主机，票数最多的，就会成为主机。

2、启动哨兵`redis-sentinel redisconfig/sentinel.conf `

```bash
6775:X 11 Mar 2021 07:54:08.914 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
6775:X 11 Mar 2021 07:54:08.914 # Redis version=6.2.1, bits=64, commit=00000000, modified=0, pid=6775, just started
6775:X 11 Mar 2021 07:54:08.914 # Configuration loaded
6775:X 11 Mar 2021 07:54:08.915 * Increased maximum number of open files to 10032 (it was originally set to 1024).
6775:X 11 Mar 2021 07:54:08.915 * monotonic clock: POSIX clock_gettime
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 6.2.1 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in sentinel mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 26379
 |    `-._   `._    /     _.-'    |     PID: 6775
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

6775:X 11 Mar 2021 07:54:08.915 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
6775:X 11 Mar 2021 07:54:08.918 # Sentinel ID is 9c7bb403e57db11fa36df083ceb2e943e002e196
6775:X 11 Mar 2021 07:54:08.918 # +monitor master myredis 127.0.0.1 6379 quorum 1
6775:X 11 Mar 2021 07:54:08.919 * +slave slave 127.0.0.1:6380 127.0.0.1 6380 @ myredis 127.0.0.1 6379
6775:X 11 Mar 2021 07:54:08.928 * +slave slave 127.0.0.1:6381 127.0.0.1 6381 @ myredis 127.0.0.1 6379

```

如果master节点断开了，这个时候就会从从机中随机选择一个服务器（这里面有个投票算法）

如果此时主机重新连接，只能当坐从机，这就是哨兵模式的规则。



> 哨兵模式

优点：

1、哨兵集群，基于主从复制模式，所有的主从配置优点，他全有。

2、主从可以切换，故障可以转移，系统的可用性就会更好

3、哨兵模式就是主从模式升级，手动到自动，更加健壮

缺点：

1、redis不好在线扩容，集群容量一旦达到上限，在线扩容就十分麻烦。

2、实现哨兵模式的配置其实很麻烦，里面有很多选择



> 哨兵配置完整版 

```bash
# Example sentinel.conf  
  
# 哨兵sentinel实例运行的端口 默认26379  
port 26379  
  
# 哨兵sentinel的工作目录  
dir /tmp  
  
# 哨兵sentinel监控的redis主节点的 ip port   
# master-name  可以自己命名的主节点名字 只能由字母A-z、数字0-9 、这三个字符".-_"组成。  
# quorum 当这些quorum个数sentinel哨兵认为master主节点失联 那么这时 客观上认为主节点失联了  
# sentinel monitor <master-name> <ip> <redis-port> <quorum>  
  sentinel monitor mymaster 127.0.0.1 6379 2  
  
# 当在Redis实例中开启了requirepass foobared 授权密码 这样所有连接Redis实例的客户端都要提供密码  
# 设置哨兵sentinel 连接主从的密码 注意必须为主从设置一样的验证密码  
# sentinel auth-pass <master-name> <password>  
sentinel auth-pass mymaster MySUPER--secret-0123passw0rd  
  
  
# 指定多少毫秒之后 主节点没有应答哨兵sentinel 此时 哨兵主观上认为主节点下线 默认30秒  
# sentinel down-after-milliseconds <master-name> <milliseconds>  
sentinel down-after-milliseconds mymaster 30000  
  
# 这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行 同步，  
这个数字越小，完成failover所需的时间就越长，  
但是如果这个数字越大，就意味着越 多的slave因为replication而不可用。  
可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。  
# sentinel parallel-syncs <master-name> <numslaves>  
sentinel parallel-syncs mymaster 1  
  
  
  
# 故障转移的超时时间 failover-timeout 可以用在以下这些方面：   
#1. 同一个sentinel对同一个master两次failover之间的间隔时间。  
#2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那里同步数据时。  
#3.当想要取消一个正在进行的failover所需要的时间。    
#4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了  
# 默认三分钟  
# sentinel failover-timeout <master-name> <milliseconds>  
sentinel failover-timeout mymaster 180000  
  
# SCRIPTS EXECUTION  
  
#配置当某一事件发生时所需要执行的脚本，可以通过脚本来通知管理员，例如当系统运行不正常时发邮件通知相关人员。  
#对于脚本的运行结果有以下规则：  
#若脚本执行后返回1，那么该脚本稍后将会被再次执行，重复次数目前默认为10  
#若脚本执行后返回2，或者比2更高的一个返回值，脚本将不会重复执行。  
#如果脚本在执行过程中由于收到系统中断信号被终止了，则同返回值为1时的行为相同。  
#一个脚本的最大执行时间为60s，如果超过这个时间，脚本将会被一个SIGKILL信号终止，之后重新执行。  
  
#通知型脚本:当sentinel有任何警告级别的事件发生时（比如说redis实例的主观失效和客观失效等等），将会去调用这个脚本，  
这时这个脚本应该通过邮件，SMS等方式去通知系统管理员关于系统不正常运行的信息。调用该脚本时，将传给脚本两个参数，  
一个是事件的类型，  
一个是事件的描述。  
如果sentinel.conf配置文件中配置了这个脚本路径，那么必须保证这个脚本存在于这个路径，并且是可执行的，否则sentinel无法正常启动成功。  
#通知脚本  
# sentinel notification-script <master-name> <script-path>  
  sentinel notification-script mymaster /var/redis/notify.sh  
  
# 客户端重新配置主节点参数脚本  
# 当一个master由于failover而发生改变时，这个脚本将会被调用，通知相关的客户端关于master地址已经发生改变的信息。  
# 以下参数将会在调用脚本时传给脚本:  
# <master-name> <role> <state> <from-ip> <from-port> <to-ip> <to-port>  
# 目前<state>总是“failover”,  
# <role>是“leader”或者“observer”中的一个。   
# 参数 from-ip, from-port, to-ip, to-port是用来和旧的master和新的master(即旧的slave)通信的  
# 这个脚本应该是通用的，能被多次调用，不是针对性的。  
# sentinel client-reconfig-script <master-name> <script-path>  
 sentinel client-reconfig-script mymaster /var/redis/reconfig.sh  

```



### Redis缓存穿透和雪崩

redis缓存的使用，极大的提升了应用程序的性能和效率，特别是数据查询方面。但同时，他也带来了一些问题，其中，最重要的问题，就是数据的一致性问题，从严格意义上讲，这个问题无解，如果对数据的一致性要求很高，那么就不能使用缓存。

另外的一些典型问题，缓存穿透、缓存雪崩和缓存击穿。目前，业界都有比较流行的解决方案。

#### 缓存穿透

> 概念

缓存穿透的概念很简单，用户想要查询一个数据，发现redis内存数据库没有，也就是缓存没有命中，于是向持久层数据库查询，发现也没有，于是本次查询失败，当用户很多的时候，缓存都没有命中，于是都去请求了持久层数据库。这会给持久层数据库造成很大的压力，这时候相当于出现了缓存穿透。

> 解决方案

#### 布隆过滤器

布隆过滤器时一种数据结构，对所有可能查询的参数以hash形式存储，在控制层先进行校验，不符合则迭起，从而避免了对底层存储系统的查询压力。



#### 缓存空对象





















## redis入门

### 概述

>redis是什么？

redis即远程字典服务！

是一个开源的使用ANSI C语言编写、尺寸网络、可基于内存亦可持久化的日志型、Key-Value数据库。并提供多种语言的API。免费开源。是当下最热门的NoSWQL技术之一，也被人们称之为结构化数据库。

> redis能干嘛？

1、内存存储、持久化，内存中是断电即失，所以持久化很重要（rdb、aof）

2、效率高，可用于高速缓存

3、发布订阅系统

4、地图信息分析

5、计时器、计数器（浏览量）

> 特性

1、多样的数据类型

2、持久化

3、集群

4、事务



> 需要用的东西


<Vssue  />
