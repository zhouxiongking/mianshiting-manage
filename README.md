# mianshiting-manage

该项目主要用于面试厅的后台维护，包括试题的制作，文章的维护等

## 本地开发流程

本项目为前后端分离的形式，client是前端代码，service是服务端代码。

1、启动一个控制台窗口，进入client文件夹下,启动前端服务

```
  $ npm install 
  $ npm run serve
```

2、启动一个新的控制台窗口，进入service文件夹下，启动后端服务

```
  $ npm install
  $ node index.js
```

## 服务器部署

如果本地开发完成，代码提交后，部署到服务器上，需要做一下步骤。

1、进入client文件下，执行build命令进行打包。

```
  $ npm run build
```

得到dist文件夹，然后将dist文件夹拷贝到service文件夹下，再将dist文件夹名字修改为wwwroot。

因为node端使用的是wwwroot文件夹作为项目的静态资源存储地。

2、进入service文件夹下，启动服务端。

```
  $ node index.js
```

然后使用ip+端口号进行访问。


