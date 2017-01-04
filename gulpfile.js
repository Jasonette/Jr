const   gulp        = require('gulp');
var     $           = require('gulp-load-plugins')();
const   rimraf      = require('rimraf');
const   runSequence = require('run-sequence');

gulp.task('pug', function() {
  return gulp.src('./dev/web/pages/*.pug')
    .pipe($.pug())
    .pipe($.htmlBeautify())
    .pipe(gulp.dest('./public/'))
});

gulp.task('sass', function() {
  return gulp.src('./dev/static/sass/global.scss')
    .pipe($.sourcemaps.init({largeFile: true}))
    .pipe($.sass({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./public/'))
});

gulp.task('sass:dev', function() {
  return gulp.src('./dev/static/sass/global.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
    }))
    .pipe($.gulp.dest('./public/'))
});

gulp.task('font', function() {
    return gulp.src('./dev/static/font/**/*.*')
      .pipe(gulp.dest('./public/font/'))
});

gulp.task('scripts', function() {
    return gulp.src(['./dev/static/js/**/*.js'])
      .pipe($.concat('dist.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('./public/'))
});

gulp.task('scripts:dev', function() {
    return gulp.src(['./dev/static/js/vendor/jquery.js', './dev/static/js/**/*.js'])
      .pipe($.concat('dist.js'))
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
  console.log("Loaded plugins: ")
  console.log(Object.keys($));
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