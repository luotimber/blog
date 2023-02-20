---
title: Docker 部署 RocketMQ
date: 2021-12-20
tags:
- docker
- container
- docker-compose
- RocketMQ
---


> **注意：** 启动 RocketMQ Server + Broker + Console 至少需要 2G 内存

- docker-compose.yml

```
version: '3.5'
services:
  rmqnamesrv:
    image: foxiswho/rocketmq:server
    container_name: rmqnamesrv
    ports:
      - 9876:9876
    volumes:
      - ./data/logs:/opt/logs
      - ./data/store:/opt/store
    networks:
        rmq:
          aliases:
            - rmqnamesrv
  rmqbroker:
    image: foxiswho/rocketmq:broker
    container_name: rmqbroker
    ports:
      - 10909:10909
      - 10911:10911
    volumes:
      - ./data/logs:/opt/logs
      - ./data/store:/opt/store
      - ./data/brokerconf/broker.conf:/etc/rocketmq/broker.conf
    environment:
        NAMESRV_ADDR: "rmqnamesrv:9876"
        JAVA_OPTS: " -Duser.home=/opt"
        JAVA_OPT_EXT: "-server -Xms128m -Xmx128m -Xmn128m"
    command: mqbroker -c /etc/rocketmq/broker.conf
    depends_on:
      - rmqnamesrv
    networks:
      rmq:
        aliases:
          - rmqbroker
  rmqconsole:
    image: styletang/rocketmq-console-ng
    container_name: rmqconsole
    ports:
      - 8080:8080
    environment:
        JAVA_OPTS: "-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false"
    depends_on:
      - rmqnamesrv
    networks:
      rmq:
        aliases:
          - rmqconsole
networks:
  rmq:
    name: rmq
    driver: bridge

```

- RocketMQ Broker 需要一个配置文件，按照上面的 Compose 配置，我们需要在 `./data/brokerconf/` 目录下创建一个名为 `broker.conf` 的配置文件，内容如下：
- mkdir -p data/brokerconf 
- vi data/brokerconf/broker.conf

```
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
# 修改为你虚拟机的 IP
brokerIP1=192.168.1.203
defaultTopicQueueNums=4
autoCreateTopicEnable=true
autoCreateSubscriptionGroup=true
listenPort=10911
deleteWhen=04
fileReservedTime=120
mapedFileSizeCommitLog=1073741824
mapedFileSizeConsumeQueue=300000
diskMaxUsedSpaceRatio=88
maxMessageSize=65536
brokerRole=ASYNC_MASTER
flushDiskType=ASYNC_FLUSH
```

### Broker 配置文件说明

```
# 所属集群名字
brokerClusterName=DefaultCluster
# broker 名字，注意此处不同的配置文件填写的不一样，如果在 broker-a.properties 使用: broker-a,
# 在 broker-b.properties 使用: broker-b
brokerName=broker-a
# 0 表示 Master，> 0 表示 Slave
brokerId=0
# nameServer地址，分号分割
# namesrvAddr=rocketmq-nameserver1:9876;rocketmq-nameserver2:9876
# 启动IP,如果 docker 报 com.alibaba.rocketmq.remoting.exception.RemotingConnectException: connect to <192.168.0.120:10909> failed
# 解决方式1 加上一句 producer.setVipChannelEnabled(false);，解决方式2 brokerIP1 设置宿主机IP，不要使用docker 内部IP（经过测试，桥接网络，要使用虚拟机ip，）
brokerIP1=192.168.141.123
# 在发送消息时，自动创建服务器不存在的topic，默认创建的队列数
defaultTopicQueueNums=4
# 是否允许 Broker 自动创建 Topic，建议线下开启，线上关闭 ！！！这里仔细看是 false，false，false
autoCreateTopicEnable=true
# 是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭
autoCreateSubscriptionGroup=true
# Broker 对外服务的监听端口
listenPort=10911
# 删除文件时间点，默认凌晨4点
deleteWhen=04
# 文件保留时间，默认48小时
fileReservedTime=120
# commitLog 每个文件的大小默认1G
mapedFileSizeCommitLog=1073741824
# ConsumeQueue 每个文件默认存 30W 条，根据业务情况调整
mapedFileSizeConsumeQueue=300000
# destroyMapedFileIntervalForcibly=120000
# redeleteHangedFileInterval=120000
# 检测物理文件磁盘空间
diskMaxUsedSpaceRatio=88
# 存储路径
# storePathRootDir=/home/ztztdata/rocketmq-all-4.1.0-incubating/store
# commitLog 存储路径
# storePathCommitLog=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/commitlog
# 消费队列存储
# storePathConsumeQueue=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/consumequeue
# 消息索引存储路径
# storePathIndex=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/index
# checkpoint 文件存储路径
# storeCheckpoint=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/checkpoint
# abort 文件存储路径
# abortFile=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/abort
# 限制的消息大小
maxMessageSize=65536
# flushCommitLogLeastPages=4
# flushConsumeQueueLeastPages=2
# flushCommitLogThoroughInterval=10000
# flushConsumeQueueThoroughInterval=60000
# Broker 的角色
# - ASYNC_MASTER 异步复制Master
# - SYNC_MASTER 同步双写Master
# - SLAVE
brokerRole=ASYNC_MASTER
# 刷盘方式
# - ASYNC_FLUSH 异步刷盘
# - SYNC_FLUSH 同步刷盘
flushDiskType=ASYNC_FLUSH
# 发消息线程池数量
# sendMessageThreadPoolNums=128
# 拉消息线程池数量
# pullMessageThreadPoolNums=128
```

#### 集群部署方式：

##### 一台服务器部署集群：

```
1、/usr/local/docker/rockermq/data/brokerconf路径下，新建broker-a.conf,broker-b.conf两个配置文件
/usr/local/docker/rockermq/data/brokerconf
```



1、broker-a.conf 文件内容

```
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
namesrvAddr=192.168.1.181:9876,192.168.1.181:9871
# 修改为你宿主机的 IP
brokerIP1=192.168.1.181
defaultTopicQueueNums=4
autoCreateTopicEnable=true
autoCreateSubscriptionGroup=true
listenPort=10911
deleteWhen=04
fileReservedTime=120
mapedFileSizeCommitLog=1073741824
mapedFileSizeConsumeQueue=300000
diskMaxUsedSpaceRatio=88
maxMessageSize=65536
brokerRole=ASYNC_MASTER
flushDiskType=ASYNC_FLUSH


```

2、broker-b.conf 文件内容

```
brokerClusterName=DefaultCluster
brokerName=broker-b
brokerId=0
namesrvAddr=192.168.1.181:9876,192.168.1.181:9871
# 修改为你宿主机的 IP
brokerIP1=192.168.1.181
defaultTopicQueueNums=4
autoCreateTopicEnable=true
autoCreateSubscriptionGroup=true
listenPort=10911
deleteWhen=04
fileReservedTime=120
mapedFileSizeCommitLog=1073741824
mapedFileSizeConsumeQueue=300000
diskMaxUsedSpaceRatio=88
maxMessageSize=65536
brokerRole=ASYNC_MASTER
flushDiskType=ASYNC_FLUSH
```





3、docker-compose.yml

```
version: '3.5'
services:
  rmqnamesrv-a:
    image: foxiswho/rocketmq:server
    container_name: rmqnamesrv-a
    ports:
      - 9876:9876
    volumes:
      - ./data/logs/rmqnamesrv-a:/opt/logs
      - ./data/store/rmqnamesrv-b:/opt/store
    networks:
        rmq:
          aliases:
            - rmqnamesrv-a
  rmqnamesrv-b:
    image: foxiswho/rocketmq:server
    container_name: rmqnamesrv-b
    ports:
      - 9877:9877
    volumes:
      - ./data/logs/rmqnamesrv-b:/opt/logs
      - ./data/store/rmqnamesrv-b:/opt/store
    networks:
        rmq:
          aliases:
            - rmqnamesrv-b
  rmqbroker-a:
    image: foxiswho/rocketmq:broker
    container_name: rmqbroker-a
    ports:
      - 10909:10909
     # - 10911:10911
    volumes:
      - ./data/logs/broker-a:/opt/logs
      - ./data/store/broker-a:/opt/store
      - ./data/brokerconf/broker-a.conf:/etc/rocketmq/broker.conf
    environment:
        NAMESRV_ADDR: "rmqnamesrv-a:9876"
        JAVA_OPTS: " -Duser.home=/opt"
        JAVA_OPT_EXT: "-server -Xms128m -Xmx128m -Xmn128m"
    command: mqbroker -c /etc/rocketmq/broker.conf
    depends_on:
      - rmqnamesrv-a
    networks:
      rmq:
        aliases:
          - rmqbroker-a
  rmqbroker-b:
    image: foxiswho/rocketmq:broker
    container_name: rmqbroker-b
    ports:
     # - 10909:10909
      - 10911:10911
    volumes:
      - ./data/logs/broker-b:/opt/logs
      - ./data/store/broker-b:/opt/store
      - ./data/brokerconf/broker-b.conf:/etc/rocketmq/broker.conf
    environment:
        NAMESRV_ADDR: "rmqnamesrv-b:9876"
        JAVA_OPTS: " -Duser.home=/opt"
        JAVA_OPT_EXT: "-server -Xms128m -Xmx128m -Xmn128m"
    command: mqbroker -c /etc/rocketmq/broker.conf
    depends_on:
      - rmqnamesrv-b
    networks:
      rmq:
        aliases:
          - rmqbroker-b
  rmqconsole:
    image: styletang/rocketmq-console-ng
    container_name: rmqconsole
    ports:
      - 8080:8080
    environment:
        JAVA_OPTS: "-Drocketmq.namesrv.addr=rmqnamesrv-a:9876;rmqnamesrv-b:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false"
    #depends_on:
     # - rmqnamesrv-b
    networks:
      rmq:
        aliases:
          - rmqconsole
networks:
  rmq:
    name: rmq
    driver: bridge

```



##### 多台服务器部署集群：

服务器一：

```
1、/usr/local/docker/rockermq/data/brokerconf路径下，新建broke配置文件
```

1、broker.conf 文件内容

```
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
namesrvAddr=192.168.1.181:9876,1921.68.1.203:9876
# 修改为你宿主机的 IP
brokerIP1=192.168.1.203
defaultTopicQueueNums=4
autoCreateTopicEnable=true
autoCreateSubscriptionGroup=true
listenPort=10909
deleteWhen=04
fileReservedTime=120
mapedFileSizeCommitLog=1073741824
mapedFileSizeConsumeQueue=300000
diskMaxUsedSpaceRatio=88
maxMessageSize=65536
brokerRole=ASYNC_MASTER
flushDiskType=ASYNC_FLUSH

```

2、docker-composr.yml文件内容

```
version: '3.5'
services:
  rmqnamesrv-a:
    image: foxiswho/rocketmq:server
    container_name: rmqnamesrv-a
    ports:
      - 9876:9876
    volumes:
      - ./data/logs:/opt/logs
      - ./data/store:/opt/store
    networks:
        rmq:
          aliases:
            - rmqnamesrv-a
  rmqbroker-a:
    image: foxiswho/rocketmq:broker
    container_name: rmqbroker-a
    ports:
      - 10909:10909
      - 10911:10911
    volumes:
      - ./data/logs:/opt/logs
      - ./data/store:/opt/store
      - ./data/brokerconf/broker.conf:/etc/rocketmq/broker.conf
    environment:
        NAMESRV_ADDR: "rmqnamesrv-a:9876"
        JAVA_OPTS: " -Duser.home=/opt"
        JAVA_OPT_EXT: "-server -Xms128m -Xmx128m -Xmn128m"
    command: mqbroker -c /etc/rocketmq/broker.conf
    depends_on:
      - rmqnamesrv-a
    networks:
      rmq:
        aliases:
          - rmqbroker-a
  rmqconsole:
    image: styletang/rocketmq-console-ng
    container_name: rmqconsole
    ports:
      - 8080:8080
    environment:
            JAVA_OPTS: "-Drocketmq.namesrv.addr=rmqnamesrv-a:9876;rmqnamesrv-b:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false"
    depends_on:
      - rmqnamesrv-a
    networks:
      rmq:
        aliases:
          - rmqconsole
networks:
  rmq:
    name: rmq
    driver: bridge

```



服务器二
1、broker.conf 文件内容

```
brokerClusterName=DefaultCluster
brokerName=broker-b
brokerId=0
namesrvAddr=192.168.1.203:9876,192.168.1.181:9871
# 修改为你宿主机的 IP
brokerIP1=192.168.1.181
defaultTopicQueueNums=4
autoCreateTopicEnable=true
autoCreateSubscriptionGroup=true
listenPort=10911
deleteWhen=04
fileReservedTime=120
mapedFileSizeCommitLog=1073741824
mapedFileSizeConsumeQueue=300000
diskMaxUsedSpaceRatio=88
maxMessageSize=65536
brokerRole=ASYNC_MASTER
flushDiskType=ASYNC_FLUSH

```

2、docker-compose.yml

```
version: '3.5'
services:
  rmqnamesrv-b:
    image: foxiswho/rocketmq:server
    container_name: rmqnamesrv-b
    ports:
      - 9877:9877
    volumes:
      - ./data/logs:/opt/logs
      - ./data/store:/opt/store
    networks:
        rmq:
          aliases:
            - rmqnamesrv-b
  rmqbroker-b:
    image: foxiswho/rocketmq:broker
    container_name: rmqbroker-b
    ports:
      - 10909:10909
      - 10911:10911
    volumes:
      - ./data/logs:/opt/logs
      - ./data/store:/opt/store
      - ./data/brokerconf/broker.conf:/etc/rocketmq/broker.conf
    environment:
        NAMESRV_ADDR: "rmqnamesrv-b:9877"
        JAVA_OPTS: " -Duser.home=/opt"
        JAVA_OPT_EXT: "-server -Xms128m -Xmx128m -Xmn128m"
    command: mqbroker -c /etc/rocketmq/broker.conf
    depends_on:
      - rmqnamesrv-b
    networks:
      rmq:
        aliases:
          - rmqbroker-b
  rmqconsole:
    image: styletang/rocketmq-console-ng
    container_name: rmqconsole
    ports:
      - 8080:8080
    environment:
            JAVA_OPTS: "-Drocketmq.namesrv.addr=rmqnamesrv-b:9876;rmqnamesrv-a:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false"
    depends_on:
      - rmqnamesrv-b
    networks:
      rmq:
        aliases:
          - rmqconsole
networks:
  rmq:
    name: rmq
    driver: bridge

```


<Vssue  />
