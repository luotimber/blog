---
title: Swap分区
date: 2017-12-28
tags:
- centos7
- Swap
---

# centos7 创建 Swap分区



```vim
1.进入root权限： 
	sudo -i
2. 创建swap 分区
	dd if=/dev/zero of=/swap_file bs=1M count=8192
注：此文件的大小是count的大小乘以bs大小，上面命令的大小是8GB;这个过程可能需要等一会儿。
3 通过mkswap命令将上面新建出的文件做成swap分区
　　mkswap /swap_file
4 启用交换分区
　　swapon /swap_file
注：如果提示 不安全的权限 0644，建议使用 0600。/不安全的文件拥有者 600，建议使用 0(root)。
	chmod 0600 /swap_file
	swapon /swap_file
注：swapon 失败: 设备或资源忙
	swapoff /swap_file
	swapon /swap_file
5 设置开机自动挂载
　　vim /etc/fstab
　在里面加入以下内容并保存。
　　/swap_file swap swap defaults 0 0

6 查看内核参数vm.swappiness中的数值是否为0，如果为0则根据实际需要调整成30或者60

	cat /proc/sys/vm/swappiness

我的是0，我改成了60，通过 sysctl -w vm.swappiness=60 命令。

这里需要简单说明下,在Linux系统中,可以通过查看/proc/sys/vm/swappiness内容的值来确定系统对SWAP分区的使用原则。当swappiness内容的值为0时,表示最大限度地使用物理内存,物理内存使用完毕后,才会使用SWAP分区。当swappiness内容的值为100时,表示积极地使用SWAP分区,并且把内存中的数据及时地置换到SWAP分区。注：若想永久修改，则编辑/etc/sysctl.conf文件
我们这里设置的50,就表示当物理内存少于50%时便使用交换分区。

7.关闭swap分区

　　swapoff /swap_file

8. 关于多个交换分区在使用上的优先级

如果你有多于一个交换文件或交换分区，你可以给它们各自分配一个优先级值(0 到 32767)。系统会在使用较低优先级的交换区域前优先使用较高优先级的交换区域。例如，如果你有一个较快的磁盘 (/dev/sda) 和一个较慢的磁盘 (/dev/sdb)，给较快的设备分配一个更高的优先级。优先级可以在 fstab 中通过 pri 参数指定：  

/dev/sda1 none swap defaults,pri=100 0 0    
/dev/sdb2 none swap defaults,pri=10  0 0


或者通过 swapon 的 ?p (或者 ??priority) 参数：
swapon -p 100 /dev/sda1

如果两个或更多的区域有同样的优先级，并且它们都是可用的最高优先级，页面会按照循环的方式在它们之间分配。
```


<Vssue  />
