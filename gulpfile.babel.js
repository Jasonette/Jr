'use strict';

import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import gulp from 'gulp';
import yaml from 'js-yaml';
import fs from 'fs';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const {
  COMPATIBILITY,
  PORT,
  UNCSS_OPTIONS,
  PATHS
} = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

gulp.task('default',
  gulp.series(gulp.parallel(sass, javascript)));

function sass() {
  return gulp.src('src/assets/scss/app.scss')
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
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
}

function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
    .pipe($.babel({
      ignore: ['what-input.js']
    }))
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => {
        console.log(e);
      })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

function watch() {
  gulp.watch('sass/**/*.scss').on('all', sass);
  gulp.watch('assets/js/**/*.js').on('all', javascript);
}
