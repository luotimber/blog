---
title: arcgis裁剪影像tif流程
date: 2022-07-11
tags:
- gis
- tif
- clip
---

# arcgis裁剪影像tif流程

首先，打开arcgis软件(arcmap)，使用数据添加按钮加入待裁剪影像tif和裁剪的影像范围(矢量数据)。

![image-20220718112014940](http://blogs.luckyluo.top:9000/blogimg/f184e535-1a02-4946-b74b-000a0381e90c.png)

然后，打开菜单栏中的arctoolsbox工具箱，点击它即可打开。

![image-20220718112027156](http://blogs.luckyluo.top:9000/blogimg/ec7439d2-9db2-40e1-be19-9d901333881d.png)

再在工具箱中依次找到：数据管理工具——栅格——栅格处理——裁剪，并打开裁剪。

![image-20220718112041637](http://blogs.luckyluo.top:9000/blogimg/872f705a-cbf4-4191-8dac-73285de8421f.png)

然后，添加影像(即栅格)，范围(即矢量数据范围)。

![image-20220718112052923](http://blogs.luckyluo.top:9000/blogimg/8f5bc093-ff43-4f4b-9a6f-c133c02cb3fc.png)

再勾选窗口中的使用输入要素裁剪几何，勾选后输出tif和裁剪的范围一致，不勾选则输入的tif为范围外接最小矩形。

![image-20220718112111266](http://blogs.luckyluo.top:9000/blogimg/a534f0d5-3559-4a8b-a969-8dbaaec9a215.png)

最后，点击确定，工具运行完成后，arcgis裁剪影像tif就完成了。

需要注意的是，裁剪保存位置应该是一个栅格数据集(默认GDB即可)。

![image-20220718112123204](http://blogs.luckyluo.top:9000/blogimg/f396feea-a0c7-43c0-a5ff-ae51f7655327.png)