const   fs = require('fs');
const   gulp = require('gulp');
const   pug = require('gulp-pug');
const   runSequence = require('run-sequence')
const   concat = require('gulp-concat');
const   uglify = require('gulp-uglify');
const   rimraf = require('rimraf');
const   cleanCSS = require('gulp-clean-css');
const   sourcemaps = require('gulp-sourcemaps');
const   autoprefixer = require('gulp-autoprefixer');
const   htmlbeautify = require('gulp-html-beautify');
const   sass = require('gulp-sass');

gulp.task('pug', function() {
  return gulp.src('./dev/web/pages/*.pug')
    .pipe(pug())
    .pipe(htmlbeautify())
    .pipe(gulp.dest('./public/'))
});

gulp.task('sass', function() {
  return gulp.src('./dev/static/sass/global.scss')
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/'))
});

gulp.task('sass:dev', function() {
  return gulp.src('./dev/static/sass/global.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('font', function() {
    return gulp.src('./dev/static/font/**/*.*')
      .pipe(gulp.dest('./public/font/'))
});

gulp.task('scripts', function() {
    return gulp.src(['./dev/static/js/vendor/jquery.js', './dev/static/js/**/*.js'])
      .pipe(concat('dist.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/'))
});

gulp.task('scripts:dev', function() {
    return gulp.src(['./dev/static/js/vendor/jquery.js', './dev/static/js/**/*.js'])
      .pipe(concat('dist.js'))
      .pipe(gulp.dest('./public/'))
});

gulp.task('images', function() {
    return gulp.src('./dev/static/image/**/*.*')
      .pipe(gulp.dest('./public/image/'))
});

gulp.task('clean', function(cb) {
    rimraf('./public', cb);
});

gulp.task('default', function() {
  runSequence(
    'clean',
    'pug',
    'sass',
    'scripts',
    'font',
    'images'
  ); 
});

gulp.task('watch', function() {
  runSequence(
    'pug',
    'sass:dev',
    'scripts:dev',
    'dev'
  );
});

gulp.task('dev', function() {
    gulp.watch('./dev/static/js/**/*.js', ['scripts:dev']);
    gulp.watch('./dev/static/sass/**/*.scss', ['sass:dev']);
    gulp.watch('./dev/web/pages/*.pug', ['pug']);
});