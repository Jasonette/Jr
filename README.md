[![Code Climate](https://codeclimate.com/github/Jasonette/Jr/badges/gpa.svg)](https://codeclimate.com/github/Jasonette/Jr)
[![Issue Count](https://codeclimate.com/github/Jasonette/Jr/badges/issue_count.svg)](https://codeclimate.com/github/Jasonette/Jr)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Jasonette/Jr/master/LICENSE)
# Jr
>[See it in action](http://jasonregistry.netlify.com/)
## Jasonette Registry

A web interface for registering and discovering Jasonette Extensions

### Installation

1. Clone Repo
2. Install [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#install-the-gulp-command)
2. Run `npm i -g yarn && yarn` in folder you just cloned to install dependencies

### Usage

- Running `gulp` or `npm start` will open a Browser Sync tab. Then, just edit code and save, and Gulp will recompile your code and reload the page.
- Running `gulp build [--production]` will build the site in to the `dist` folder. Using the `--production` flag will minify JavaScript and Sass, and disable sourcemaps.

### Adding dependencies

1. Run `yarn add <dependency>` to install the dependency.
2. Add the dependency to config.yml:

Adding a dependency to the `sass` section allows you to import it with `@import ('dependency')`.
Adding a dependency to the `javascript` section will bundle the JS file you specify in to `bundle.js`, in the order specified in `config.yml`
