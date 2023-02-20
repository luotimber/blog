---
title: arcgis的多个tif图合并
date: 2022-07-11
tags:
- gis
- tif
---

# arcgis的多个tif图合并

## 工具/原料

- win10
- ArcGIS10.2

## 方法/步骤

1. 打开arcgis软件，点击添加数据快捷键。

   ![arcgis的多个tif图合并](https://exp-picture.cdn.bcebos.com/2f2909e951e10ef8d00f158b2324d8e9cdd2ccf3.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fformat%2Cf_auto%2Fquality%2Cq_80)

2. 将两个tif图层添加到数据框中，点击【地理处理】-【Arctoolbox】。

   ![arcgis的多个tif图合并](https://exp-picture.cdn.bcebos.com/16a84fe10ef858565c64689253e9ccd2ba66cdf3.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fformat%2Cf_auto%2Fquality%2Cq_80)

   ![arcgis的多个tif图合并](https://exp-picture.cdn.bcebos.com/50a010f85856d53d227d185f47d2bb665059caf3.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fformat%2Cf_auto%2Fquality%2Cq_80)

   ![arcgis的多个tif图合并](https://exp-picture.cdn.bcebos.com/0fb94656d53da82453b00c64306651598440cbf3.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fformat%2Cf_auto%2Fquality%2Cq_80)

3. 在工具箱中选择【数据管理工具】-【栅格】-【栅格数据集】-【镶嵌至新栅格】。

   ![arcgis的多个tif图合并](https://exp-picture.cdn.bcebos.com/5917cb3da824d8e9408b7bd0da598540112ac8f3.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fformat%2Cf_auto%2Fquality%2Cq_80)

4. 输入选择要合并的tif，设置输出位置和名称，不要忘记.tif后缀，波段数根据实际情况选择，本例为1，其他设置默认即可，点击【确定】开始执行。

   ![arcgis的多个tif图合并](https://exp-picture.cdn.bcebos.com/d47cb624d8e9ccd2363f91ef0e40102a05e2c9f3.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fformat%2Cf_auto%2Fquality%2Cq_80)

5. 根据数据量大小时间长短不一，合并完成后即可看到最终结果。

   ![arcgis的多个tif图合并](https://exp-picture.cdn.bcebos.com/a1780d1fceecd3d9a52c327267995943050108f0.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fformat%2Cf_auto%2Fquality%2Cq_80)
