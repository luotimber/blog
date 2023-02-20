---
title: docker部署redis
date: 2019-12-28
tags:
- redis
- docker
---


方法一：

Docker-compose

```
#docker-compose.yml文件的版本
version: "3"
# 管理的服务
services:
  redis:
    # 指定镜像
    image: redis:4
    ports:
      # 端口映射
      - 6379:6379
    volumes:
      # 目录映射
      - "${REDIS_DIR}/conf:/usr/local/etc/redis"
      - "${REDIS_DIR}/data:/data"
    command:
      # 执行的命令
      redis-server
```

方法二：

###### 1、查看可用的 Redis 版本

```
docker search redis
```

###### 2、取最新版的 Redis 镜像

```
docker pull redis:latest
```

###### 3、查看本地镜像

```
docker images
```

###### 4、运行容器

```
docker run -itd --name redis-test -p 6379:6379 redis
```

###### 5.通过 redis-cli 连接测试使用 redis 服务

```
docker exec -it redis-test /bin/bash
```

<Vssue  />



