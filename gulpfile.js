var gulp = require('gulp');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');
var gulpConnect = require('gulp-connect');
var clean = require('gulp-clean');

// css
gulp.task('minify-css', async () => {
  gulp.src('./src/css/index.css')
    .pipe(gulpMinifyCss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulpConnect.reload());
  console.log('success minify-css');
});

// js
gulp.task('minify-js', async () => {
  gulp
    .src([
      './src/js/index1.js',
      './src/js/index2.js'
    ])
    .pipe(gulpConcat('bundle.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(gulpConnect.reload());
  console.log('success minify-js');
});

// html
gulp.task('minify-html', async () => {
  gulp.src('src/html/*.html')
    .pipe(gulpHtmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/html/'))
    .pipe(gulpConnect.reload());
    console.log('success minify-html');
});


// server
gulp.task('server', async function(){
  gulpConnect.server({
    root: "dist",
    livereload: true
  });
});

// clean build
gulp.task('clean', function(){
  return gulp.src('dist', {
    read: false,
    allowEmpty: true
  }).pipe(clean());
});

// perubahan file aplication
gulp.task('watch', async function(){
  gulp.watch('./src/js/*.js', gulp.series('minify-js'));
  gulp.watch('./src/css/*.css', gulp.series('minify-css'));
  gulp.watch('./src/html/*.html', gulp.series('minify-html'));
});

// default
gulp.task('default', gulp.series('watch','server'));
gulp.task('build', gulp.series('clean', 'minify-css', 'minify-js', 'minify-html'))