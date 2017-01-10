'use strict'

import plugins from 'gulp-load-plugins'
import yargs from 'yargs'
import browser from 'browser-sync'
import gulp from 'gulp'
import rimraf from 'rimraf'
import yaml from 'js-yaml'
import fs from 'fs'

// Load all Gulp plugins into one variable
const $ = plugins()

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production)

// Load settings from settings.yml
const {
  COMPATIBILITY,
  PORT,
  PATHS
} = loadConfig()

function loadConfig () {
  let ymlFile = fs.readFileSync('config.yml', 'utf8')
  return yaml.load(ymlFile)
}

// Build the "dist" folder by running all of the below tasks

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf(PATHS.dist, done)
})

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy () {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist))
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass () {
  return gulp.src('src/sass/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browser.reload({
      stream: true
    }))
}

// Compile Pug into HTML
function pages() {
  return gulp.src('src/pages/**/*.pug')
    .pipe($.pug())
    .pipe(gulp.dest(PATHS.dist))
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
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
    .pipe(gulp.dest(PATHS.dist + '/js'))
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/img'))
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist,
    port: PORT
  })
  done()
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload()
  done()
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy)
  gulp.watch('src/**/*.pug').on('all', gulp.series(pages, reload))
  gulp.watch('src/sass/**/*.scss').on('all', gulp.series(sass, reload))
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, reload))
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, reload))
}

gulp.task('build',
  gulp.series('clean', gulp.parallel(pages, sass, javascript, images, copy)))

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch))
