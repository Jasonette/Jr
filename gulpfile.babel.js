'use strict'

import plugins from 'gulp-load-plugins'
import yargs from 'yargs'
import gulp from 'gulp'
import yaml from 'js-yaml'
import fs from 'fs'

// Load all Gulp plugins into one variable
const $ = plugins()

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production)

// Load settings from settings.yml
const {COMPATIBILITY, PATHS} = loadConfig()

function loadConfig () {
  let ymlFile = fs.readFileSync('config.yml', 'utf8')
  return yaml.load(ymlFile)
}

gulp.task('sass', function () {
  return gulp.src('sass/app.scss')
    .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('assets/css'))
})

gulp.task('js', function () {
  return gulp.src(PATHS.javascript)
    .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
    .pipe($.babel({
      ignore: ['what-input.js']
    }))
    .pipe($.concat('bundle.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => {
        console.log(e)
      })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('assets/js'))
})

gulp.task('default',
  gulp.series(gulp.parallel('sass', 'js')))

gulp.task('watch', function () {
  gulp.series('default')
  gulp.watch('sass/**/*.scss').on('all', gulp.series('sass'))
  gulp.watch(['assets/js/**/*.js', '!assets/js/bundle.js']).on('all', gulp.series('js'))
})
