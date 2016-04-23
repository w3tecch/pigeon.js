var gulp = require('gulp'),
    path = require('path'),
    $    = require('gulp-load-plugins')({lazy: true});

var pkg = require(path.join(process.cwd(), 'package.json'));

var banner = '/*\n' +
  ' * <%= pkg.name %> <%= pkg.version %>\n' +
  ' * <%= pkg.description %>\n' +
  ' * <%= pkg.homepage %>\n' +
  ' *\n' +
  ' * Copyright 2015, <%= pkg.author %>\n' +
  ' * Released under the <%= pkg.license %> license.\n' +
  '*/\n\n';

/***********************************************************************************
 * RUN
 ***********************************************************************************/
gulp.task('watch', ['build-all'], function () {
  gulp.watch('lib/**/*.ts', ['test']);
  gulp.watch('test/**/*.ts', ['test']);
});

/***********************************************************************************
 * BUILD
 ***********************************************************************************/
gulp.task('build', [
  'uglify'
]);

/***********************************************************************************
 * TSLINT
 ***********************************************************************************/
gulp.task('ts-lint', ['clean'], function () {
  return gulp.src(['lib/**/*.ts', 'test/**/*.ts'])
    .pipe($.plumber())
    .pipe($.tslint())
    .pipe($.tslint.report('verbose'));
});
/***********************************************************************************
 * TYPESCRIPT
 ***********************************************************************************/
var typescript = require('typescript');
var tsProject = $.typescript.createProject(process.cwd() + '/tsconfig.json', {
  typescript: typescript
});

gulp.task('ts-compile-lib', ['ts-compile-test', 'ts-lint'], function () {
  var tsResult = gulp.src('lib/*.ts')
    .pipe($.typescript(tsProject));

  return tsResult.js
    .pipe($.banner(banner, {
      pkg: pkg
    }))
    .pipe($.sourcemaps.init())
    .pipe($.concat(pkg.name + '.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('ts-compile-test', ['ts-lint'], function () {
  var tsResult = gulp.src('test/*.ts')
    .pipe($.typescript(tsProject));

  return tsResult.js
    .pipe($.sourcemaps.init())
    .pipe($.concat(pkg.name + '.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('test'));
});

/***********************************************************************************
 * MIN
 ***********************************************************************************/
gulp.task('uglify', ['ts-compile-lib'], function () {
  gulp.src('./dist/' + pkg.name + '.js')
    .pipe($.uglify())
    .pipe($.rename(pkg.name + '.min.js'))
    .pipe($.banner(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('dist/'))
});


/***********************************************************************************
 * CLEAN
 ***********************************************************************************/
gulp.task('clean', function () {
  return gulp.src(['./dist', './test/**/*.js'], {read: false})
    .pipe($.clean());
});

/***********************************************************************************
 * TEST
 ***********************************************************************************/
gulp.task('test', ['build'], function () {
  return gulp
    .src('test/**/*.spec.js', {
      read: false
    })
    .pipe($.mocha({
      reporter: 'spec'
    }));
});
