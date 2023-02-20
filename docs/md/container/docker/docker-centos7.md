---
title: centos 7 安装docker和docker compose
date: 2021-12-21
tags:
- docker
- container
- docker-compose
- centos
---


1. 安装之前，先清除之前安装的旧版本 docker，如果有的话。

   

```
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```



安装Docker
我是虚拟机装的Centos7，linux 3.10 内核，docker官方说至少3.8以上，建议3.10以上（ubuntu下要linux内核3.8以上， RHEL/Centos 的内核修补过， centos6.5的版本就可以——这个可以试试）

1，root账户登录，查看内核版本如下

```
[root@localhost ~]# uname -a
Linux localhost.localdomain 3.10.0-957.el7.x86_64 #1 SMP Thu Nov 8 23:39:32 UTC 2018 
x86_64 x86_64 x86_64 GNU/Linux
```


2，把yum包更新到最新

```
[root@localhost ~]# yum update
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile

 * base: centos.ustc.edu.cn
 * extras: mirrors.aliyun.com
 * updates: mirrors.cn99.com
   base                                                                                                  | 3.6 kB  00:00:00     
   extras                                                                                                | 3.4 kB  00:00:00     
   updates                                                                                               | 3.4 kB  00:00:00     
   正在解决依赖关系
   --> 正在检查事务
   ---> 软件包 NetworkManager.x86_64.1.1.12.0-6.el7 将被 升级
   ---> 软件包 NetworkManager.x86_64.1.1.12.0-10.el7_6 将被 更新
   （期间要选择确认，输入 y 即可）
```

3，安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的

```
[root@localhost ~]# yum install -y yum-utils device-mapper-persistent-data lvm2
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile

 * base: centos.ustc.edu.cn
 * extras: mirrors.aliyun.com
 * updates: mirrors.cn99.com
   软件包 device-mapper-persistent-data-0.7.3-3.el7.x86_64 已安装并且是最新版本
   软件包 7:lvm2-2.02.180-10.el7_6.8.x86_64 已安装并且是最新版本
   正在解决依赖关系
   --> 正在检查事务
   ---> 软件包 yum-utils.noarch.0.1.1.31-50.el7 将被 安装
   --> 正在处理依赖关系 python-kitchen，它被软件包 yum-utils-1.1.31-50.el7.noarch 需要
   ...
   ...
```

4，设置yum源（选择其中一个）

```
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo（中央仓库）

yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo（阿里仓库）

[root@localhost ~]# yum-config-manager --add-repo 
https://download.docker.com/linux/centos/docker-ce.repo
已加载插件：fastestmirror
adding repo from: https://download.docker.com/linux/centos/docker-ce.repo
grabbing file https://download.docker.com/linux/centos/docker-ce.repo to 
/etc/yum.repos.d/docker-ce.repo
repo saved to /etc/yum.repos.d/docker-ce.repo
```

5，可以查看所有仓库中所有docker版本，并选择特定版本安装

```
[root@localhost ~]# yum list docker-ce --showduplicates | sort -r
已加载插件：fastestmirror
可安装的软件包

 * updates: mirrors.cn99.com
   Loading mirror speeds from cached hostfile
 * extras: mirrors.aliyun.com
   docker-ce.x86_64            3:19.03.2-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:19.03.1-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:19.03.0-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.8-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.7-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.6-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.5-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.4-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.3-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.2-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.1-3.el7                     docker-ce-stable
   docker-ce.x86_64            3:18.09.0-3.el7                     docker-ce-stable
   docker-ce.x86_64            18.06.3.ce-3.el7                    docker-ce-stable
   docker-ce.x86_64            18.06.2.ce-3.el7                    docker-ce-stable
   docker-ce.x86_64            18.06.1.ce-3.el7                    docker-ce-stable
   docker-ce.x86_64            18.06.0.ce-3.el7                    docker-ce-stable
   docker-ce.x86_64            18.03.1.ce-1.el7.centos             docker-ce-stable
   docker-ce.x86_64            18.03.0.ce-1.el7.centos             docker-ce-stable
   docker-ce.x86_64            17.12.1.ce-1.el7.centos             docker-ce-stable
```

6，安装Docker，命令：yum install docker-ce-版本号，我选的是docker-ce-18.03.1.ce，如下

```
[root@localhost ~]# yum install docker-ce-18.03.1.ce
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile

 * base: centos.ustc.edu.cn
 * extras: mirrors.aliyun.com
 * updates: mirrors.cn99.com
   正在解决依赖关系
   --> 正在检查事务
   ---> 软件包 docker-ce.x86_64.0.18.03.1.ce-1.el7.centos 将被 安装
   （期间要选择确认，输入 y 即可）
```

7， 启动Docker，命令：systemctl start docker，然后加入开机启动，如下

```
[root@localhost ~]# systemctl start docker
[root@localhost ~]# systemctl enable  docker
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
[root@localhost ~]# docker version
Client:
 Version:      18.03.1-ce
 API version:  1.37
 Go version:   go1.9.5
 Git commit:   9ee9f40
 Built:        Thu Apr 26 07:20:16 2018
 OS/Arch:      linux/amd64
 Experimental: false
 Orchestrator: swarm

Server:
 Engine:
  Version:      18.03.1-ce
  API version:  1.37 (minimum version 1.12)
  Go version:   go1.9.5
  Git commit:   9ee9f40
  Built:        Thu Apr 26 07:23:58 2018
  OS/Arch:      linux/amd64
  Experimental: false
```



3. 安装 docker-compose

```
curl -L https://github.com/docker/compose/releases/download/1.23.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
```

上面安装的是稳定版本1.23.2的 docker-compose，可以到github上找最新版 https://github.com/docker/compose/releases



4. 卸载 docker-ce

```
sudo yum remove docker-ce
sudo rm -rf /var/lib/docker
```

5. 卸载 docker-compse

```
sudo rm /usr/local/bin/docker-compose
```


<Vssue />
