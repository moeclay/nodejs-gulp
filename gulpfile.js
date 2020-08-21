var gulp = require('gulp');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');

// css
gulp.task('minify-css', async () => {
  gulp.src('./src/css/index.css')
    .pipe(gulpMinifyCss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./dist/css/'));
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
    .pipe(gulp.dest('dist/js/'));
  console.log('success minify-js');
});

// html
gulp.task('minify-html', async () => {
  gulp.src('src/html/*.html')
    .pipe(gulpHtmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/html/'));
  console.log('success minify-html');
});