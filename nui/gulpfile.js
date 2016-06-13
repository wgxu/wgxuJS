var gulp = require('gulp'),
    // config = require('./config'),
    package = require('./package.json'),
    uglify = require('gulp-uglify'),
    gulpLoadPlugins = require('gulp-load-plugins')();

var banner = '';
banner += '/**NUI框架' + package.version + '\n'
       + '* author: UED\n',
       + '* datetime: 2015-5-13'
       + '*/';
//合并压缩css文件  
gulp.task('minify-css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(gulpLoadPlugins.concat('NUI.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulpLoadPlugins.minifyCss())
        .pipe(gulpLoadPlugins.rename('NUI.min.css'))
        .pipe(gulp.dest('./dist/css'));
});

// 检查js
gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


//合并js文件gulp.task('JS',function(){
gulp.task('minify-js',function(){
    return gulp.src('./src/js/*.js')
           .pipe(gulpLoadPlugins.concat('NUI.js'))
           .pipe(gulp.dest('./dist/js'))
           .pipe(gulpLoadPlugins.rename('NUI.min.js'))
           .pipe(uglify())
           .pipe(gulp.dest('./dist/js'));
});
  
//help
gulp.task('help', function() {
    console.log('gulp help                   gulp参数说明');
    console.log('gulp minify-css             合并并压缩CSS文件');
    console.log('gulp minify-js              合并并压缩JS文件');
    console.log('gulp IMAGES                 压缩images文件');
    console.log('gulp SASS                   编译压缩SASS文件');
    console.log('gulp build                  一键打包');
});



//一键打包
gulp.task('build',function(){
    gulp.start('minify-css','minify-js');
});

gulp.task('sass', function() {
   //code to do
});

gulp.task('default', function() {
    gulp.start('help');
});