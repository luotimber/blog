---
title: typora上传图片至minio
date: 2021-12-22
tags:
- typora
- minio
---

# typora上传图片至minio



### 1.安装minio,提供access_key,secret_key



### 2.编写图片上传脚本**typorauploadimg.py**(python版),其中img_url_tmp参数,为typora本地图片缓存地址,可粘贴一张图片,查看图片地址.

```python
#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2021/12/22 9:57
# @Author  : luo
# @Site    :
# @File    : typorauploadimg.py

import sys
import uuid
from pathlib import Path
from minio import Minio

import requests

### 处理网络图片
def download_img(img_url, api_token):
    print (img_url)
    header = {"Authorization": "Bearer " + api_token} # 设置http header，视情况加需要的条目，这里的token是用来鉴权的一种方式
    r = requests.get(img_url, headers=header, stream=True)
    print(r.status_code) # 返回状态码
    if r.status_code == 200:
        img_url_tmp = 'C:\\Users\\65196\AppData\\Roaming\\Typora\\typora-user-images\\'+img_url[img_url.rindex('/')+1:len(img_url)]
        print(img_url_tmp)

        open(img_url_tmp, 'wb').write(r.content) # 将内容写入图片
        print("done")
    return img_url_tmp

# access_key: MinIo帐号
# secret_key: MinIo密码
minio_storage = Minio("192.168.1.1:9000", access_key='xxx', secret_key='xxx', secure=False)
images = sys.argv[1:]
for image in images:
    if image.startswith('http'):
        image = download_img(image, '')

    print("File Uploading ...")
    suffix = Path(image).suffix
    file_name = str(uuid.uuid4()) + suffix
    # 存储桶名称
    bucket_name = "blogimg"
    if not minio_storage.bucket_exists(bucket_name):
        # 如果存储桶不存在，则创建
        minio_storage.make_bucket(bucket_name)
    minio_storage.fput_object(bucket_name, file_name, image, content_type="image/png", part_size=10485760)


```



### 3.将脚本**typorauploadimg.py**放至指定目录,如**D:\soft**,打开typora偏好设置,点击图像,如下图设置

![image-20220712185948149](http://blogs.luckyluo.top:9000/blogimg/75244abc-5605-4331-9170-5c0c6b410f9e.png)

### 

