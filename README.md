本代码适用于静态页面，通过自动化工具gulp把网站静态资源进行压缩

## 代码使用说明

### 1.新建代码目录，把代码克隆到本地

### 2.新建src和dist目录
src 存放压缩前代码

src下的默认文件为css，images、js和html文件

dist 存放压缩后代码

### 3.安装node包依赖
运行npm install或yarn 安装gulp运行的相关依赖

最后目录结构如下

![](https://user-gold-cdn.xitu.io/2019/11/27/16eab6c56320eb58?w=196&h=290&f=png&s=12160)

### 4.安装全局环境gulp

npm install gulp@3.9.1 -g

### 5。把要压缩的代码放到src目录下

### 6.执行压缩命令
gulp start
集成命令压缩src下的css，js，images,html ,复制其他目录如font

下面是单独的命令，可独立执行

* uglifyjs js压缩工具，运行gulp uglifyjs 即可执行 压缩src js目录下的代码到 dist目录下js目录中
* minifycss css压缩工具
* image 图片压缩工具 
* copy 代码复制工具
* html HTML压缩工具
* watchjs 监听js目录下的js文件变化，如有变化自动执行压缩js文件操作
* watchcss 监听css文件
* watchimage 监听图片文件
* watchcopy 监听复制文件
* watchhtml 监听html

### 实现代码自动化构建

运行 gulp default命令

src下的任意文件修改都会自动执行压缩任务，把相应修改的文件压缩到对应的dist文件中


代码地址 [https://github.com/18334770485/gulp](https://github.com/18334770485/gulp)

特别说明，本地node是8.11.2，如果报node版本不兼容，可以用node版本切换工具进行切换版本

windows下可以用gnvm工具切花

linux和mac下可以用nvm工具切换
