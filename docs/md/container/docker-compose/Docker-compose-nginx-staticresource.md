---
title: docker -compose 部署nginx，挂载静态资源、开启ssl
date: 2019-12-28
tags:
- redis
- docker -compose
---


#### 1、在 /usr/local/docker目录下创建nginx文件夹，若使用https，在nginx目录下新建cert文件夹，讲域名的ssl证书nginx版本下载后，放在cert文件夹内。**5703448_g.luckyluo.top.pem文件、5703448_g.luckyluo.top.key文件**

#### 2、创建conf文件夹，在conf文件夹下创建nginx.conf文件

#### 3、自定义配置文件nginx.conf

```nginx
events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  300;
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  300;
        
## ssl 使用， proxy_pass为转发地址，意思为：访问 https://g.luckyluo.top 转发到 http://221.131.72.4:9010/ ；前提是域名 g.luckyluo.top 已经解析到nginx所在服务器公网ip。   
    server {
        listen 443 ssl;
        server_name g.luckyluo.top;
        ssl_certificate   /etc/nginx/cert/5703448_g.luckyluo.top.pem;
        ssl_certificate_key  /etc/nginx/cert/5703448_g.luckyluo.top.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

         location / {
        proxy_pass http://221.131.72.4:9010/;
    }

}
    
       # 静态资源使用 
	server {
			listen       80;
			server_name  localhost;
			 add_header Access-Control-Allow-Origin *;
			 add_header Access-Control-Allow-Credentials 'true'; 
			 add_header Access-Control-Allow-Methods *;
			 add_header Access-Control-Allow-Headers *;


		  #拦截静态资源
		  location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|js|css)$ {
			root /usr/share/nginx/html/static;
		   }
			error_page   500 502 503 504  /50x.html;
			location = /50x.html {
				root   html;
			}
			}
		}
	}

```

 

#### 4、在/usr/local/docker/nginx文件夹下，创建docker-compose.yml

```yml
version: "3"
services:
  nginx:
    container_name: nginx
    image: nginx
    restart: always
    ports:
      - 80:80
      - 443:443  # https 访问端口，访问此端口时不用家端口号
    privileged: true
    volumes:
      - /usr/local/docker/nginx/conf/proxy.conf:/etc/nginx/proxy.conf
      - /usr/local/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - /usr/local/docker/nginx/conf/conf.d:/etc/nginx/conf.d
      - /usr/local/docker/nginx/html:/usr/share/nginx/html
      - /usr/local/docker/nginx/logs:/var/log/nginx
      - /usr/local/docker/nginx/cert:/etc/nginx/cert # 域名ssl证书地址
    networks:
      - myweb

networks:
  myweb:
    driver: bridge
```

#### 5、新建文件路径

在/usr/local/docker/nginx文件夹下新建/conf.d 文件夹
在/usr/local/docker/nginx文件夹下新建 //html 文件夹

#### 6、在html文件夹中，新建static文件夹，讲静态文件上传至static文件夹

#### 7、启动

```
docker-compose up -d
```

#### 8、修改配置文件后，重启容器

```
docker-compose up -d --force-recreate
```

### 注意：nginx.conf 配置文件中，server内配置的html路径，为docker容器中路径，不能写成宿主机内的路径


<Vssue  />


