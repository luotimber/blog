---
title: minio安装
date: 2022-04-12
tags:
- minio
- 对象存储
---

# minio 安装



> 1.下载minio

```bash
wget https://dl.min.io/server/minio/release/darwin-amd64/minio
```

> 2.编写启动脚本

```
#!/bin/bash
nohup ./minio server ./data --console-address=':9001' --address=':9000' &
echo '启动成功！'
```

指定控制台端口**9001**与服务端口**9000**

> 3.minio统计目录创建data文件夹,**sh start.sh**启动minio

> 4.访问 ip:9001,初始用户名密码:minioadmin:minioadmin

> 5.创建user

![image-20220712184138162](http://blogs.luckyluo.top:9000/blogimg/d29fdb3f-4f2e-4d2c-a420-f90dc3ace319.png)

> 6.创建bucket
