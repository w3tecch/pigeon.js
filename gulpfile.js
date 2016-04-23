var gulp = require('gulp'),
    path = require('path'),
    $    = require('gulp-load-plugins')({lazy: true});

var pkg = require(path.join(process.cwd(), 'package.json'));
/***********************************************************************************
 * TSLINT
 ***********************************************************************************/
gulp.task('ts-lint', function () {
  return gulp.src('lib/**/*.ts')
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

gulp.task('ts-compile', ['ts-lint'], function (done) {
  var tsconfig = {
    noImplicitAny: false,
    removeComments: true,
    noEmitOnError: true,
    preserveConstEnums: true,
    sourceMap: false,
    declaration: false,
    noResolve: true,
    target: 'es5'
  };
  tsconfig.out = pkg.name;
  var scripts = 'lib/**/*.ts';

  var tsResult = gulp.src(scripts, {
      base: '.'
    })
    .pipe($.sourcemaps.init()) // This means sourcemaps will be generated
    .pipe($.typescript({
      target: 'es5',
      sortOutput: true,
      removeComments: true,
      noEmitOnError: true
    }));

  tsResult.js
    .pipe($.concat(pkg.name + '.debug.js')) // You can use other plugins that also support gulp-sourcemaps
    .pipe($.sourcemaps.write()) // Now the sourcemaps are added to the .js file
    .pipe(gulp.dest('dist'))
    .on('end', function () {
      done();
    });

});

/***********************************************************************************
 * CLEAN
 ***********************************************************************************/
gulp.task('clean-dist', function () {
  return gulp.src('./dist', {read: false})
    .pipe($.clean());
});