# gulp
##  使用本代码需要先安装全局gulp npm install gulp -g

## 进入代码所在目录

## 新建文件夹src
文件夹src是存放待压缩文件
src下默认有images，css，js和html文件
这些可以修改，但代码中对应的目录结构也要修改

## dist 是存放文件生成的代码

## 安装运行依赖 npm install或yarn

## 一次构建直接运行 gulp start
运行此命令可以把src下文件压缩到dist目录下

##  自动化构建运行 gulp default
运行此命令会监听src下的修改，自动把修改文件压缩到dist目录下

##  代码中有两种压缩图片的工具 #在配置文件gulpfile.js代码132和135行 如果想提高压缩速度，把132行代码注释，135行代码取消注释
