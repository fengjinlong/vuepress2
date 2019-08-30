## linux
```
ls cd 
退回
cd / 根目录
cd ..
cd../..

创建aaa
mkdir aaa

cd aaa
mkdir bbb

复制文件
cp 1.txt aaa/1.txt
复制文件夹
cp -R aaa ddd
当前目录
pwd
删除
rm 1.txt
删词目录
rm -r bbb
-r 就是向下递归，不管有多少级目录，一并删除
-f 就是直接强行删除，不作任何提示的意思

删除文件夹实例：
rm -rf /var/log/httpd/access
将会删除/var/log/httpd/access目录以及其下所有文件、文件夹

新建文件
touch index.js
编辑文件
vi index.js
查看
cat index.js
```

linux 下载 加 -c支持断电续传
wget -c url

解压
unzip xxx.zip

cd / 进入根目录 
cd ~ 进入桌面

## centOS 设置网路

1. 首先需要用 nmtui 命令进入 Network Manager，如下
2. 选择 Edit a connection 来配置你的网络连接：
3. 选择Edit进入DHCP配置：
4. 选择IPv4 CONFIGURATION为Automatic，并且勾选Automatically connect选项。
5. 最后返回命令行，输入:service network restart
6. 有了网络连接后，人生一下子就光明了！在CentOS 7 minimal中，默认net-tools是没有预先安装 的。现在有了网络连接后，就可以使用yum install net-tools


## windows
```
dir 查看当前所有
cd

创建文件夹
md aaa

cd..

复制
copy a.txt aaa
删除
del a.txt
改名字
rename 1.txt 2.txt

```

## 权限
sudo chmod -R 777 assets   更改assets权限 

## mac 执行 .sh
赋予脚本可执行权限，输入命令：chmod +x test1.sh 回车(第一次需要此步骤)
./test1.sh
