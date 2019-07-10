// 引入压缩gulp
const gulp = require('gulp');
// 引入gulp提示器
const gutil = require('gulp-util');
// 引入gulp-uglify js代码压缩工具
const uglify = require('gulp-uglify');
// 引入代码变化监测工具 gulp-watch-path
const watchPath = require('gulp-watch-path')
// 引入js代码报错提示和容错机制 stream-combiner2
const combiner = require('stream-combiner2')
// 引入map调试工具
const sourcemaps = require('gulp-sourcemaps')
// 引入css代码压缩工具
const minifyCss = require('gulp-minify-css')
// 多任务同时构建工具
const gulpSequence = require('gulp-sequence')
// css自动前缀补全工具，兼容不同浏览器
const autoprefixer = require('gulp-autoprefixer')
// 引入图片压缩插件，功能弱，速度快
const imagemin = require('gulp-imagemin')
// 引入图片压缩插件，功能强可以压缩图片一半左右的大小，速度很慢
const smushit = require('gulp-smushit')
// 引入HTML压缩插件
const htmlMin = require('gulp-htmlmin') //压缩html
const minifyHtml = require('gulp-minify-html');


// 构建js的报错信息
var handleError = function (err){
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}

// 压缩js代码
gulp.task('uglifyjs', function () {
    // 申明js代码报错提示和容错机制
    var combined = combiner.obj([
        // js代码打包入口
        gulp.src('src/js/*.js'),
        // 生成map文件
        // sourcemaps.init(),
        // js压缩
        uglify(),
        // 打包生成的map文件存放地址
        // sourcemaps.write('./'),
        // 生成的js输出地址
        gulp.dest('dist/js/')
    ])
    // 调用js代码报错提示和容错机制
    combined.on('error', handleError)
})

// 观察js代码变化，并压缩修改的js文件
gulp.task('watchjs',function(){
    gulp.watch('src/js/*.js',function(event){
        // 配置观察的对象和获取修改的文件地址
        var paths = watchPath(event,'src/','dist/')
        // 输出修改的文件地址
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        // 输出修改后的文件生成的地址
        gutil.log('Dist ' + paths.distPath)      

        var combined = combiner.obj([
            // js代码打包入口
            gulp.src(paths.srcPath),
            // 生成map文件
            sourcemaps.init(),
            // js压缩
            uglify(),
            // 打包生成的map文件存放地址
            sourcemaps.write('./'),
            // 生成的js输出地址
            gulp.dest(paths.distDir)
        ])
        // 调用js代码报错提示和容错机制
        combined.on('error', handleError)
    })
})

// 监测css变化的文件，生成对应的css压缩文件
gulp.task('watchcss',function(){
    gulp.watch('src/css/*.css',function(event){
        var paths = watchPath(event,'src/' , 'dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' +paths.srcPath)
        gutil.log("Dist " + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: 'last 2 versions'
            }))
            .pipe(minifyCss())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
})

// 压缩css代码
gulp.task('minifycss',function(){
    gulp.src('src/css/*.css')
        // .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(minifyCss())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('watchimage',function(){
    gulp.watch('src/images/**/*.*',function(){
        var paths = watchPath(event,'src/','dist/')

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist ' + paths.distPath)

    gulp.src(paths.srcPath)
        .pipe(imagemin({
            progressive:true
        }))
        .pipe(gulp.dest(paths.distDir))
    })   
})

gulp.task('image', function () {

        gulp.src('src/images/**/*.{png,jpg,gif,jpeg}')
        .pipe(smushit({
            verbose: true
        })) //压缩强度大，速度慢
        // .pipe(imagemin({
        //     progressive: true
        // }))
        .pipe(gulp.dest('dist/images'))
   
})

gulp.task('watchhtml',function(){
    gulp.watch('src/*.html',function(){
        var paths = watchPath(event,'src/','dist/')

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist ' + paths.distPath)

    gulp.src(paths.srcPath)
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.distDir))
    })   
})

gulp.task('html',function(){
    //找到图片
    gulp.src('src/*.html')
    // 压缩图片
        .pipe(minifyHtml())
    // 另存图片
        .pipe(gulp.dest('dist/'))    

})

gulp.task('watchcopy', function () {
    gulp.watch('src/fonts/**/*', function (event) {
        var paths = watchPath(event)

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
    })
})

gulp.task('copy', function () {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
})

gulp.task('default', gulpSequence('watchjs', 'watchcss','watchimage','watchcopy','watchhtml'));
gulp.task('start', gulpSequence('uglifyjs', 'minifycss','image','copy','html'));

