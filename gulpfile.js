var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var wait = require('gulp-wait');




gulp.task('imagemin', function() {
  return gulp.src('./source/img/*')
        .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()],
        }))
        .pipe(gulp.dest('./source/img/'));
});


gulp.task('sass', function() {
  gulp.src('./source/scss/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./source/css'));
});


gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('./source/scss/**/*.scss', ['sass']);
  gulp.watch(['./source/css/style.css', './source/js/*.js'], function(files) {
    livereload.changed(files);
  });

  gulp.watch(['./source/**/*.erb'], function(e) {
    gulp.src(e.path)
    .pipe(wait(1000))
    .pipe(livereload({ reloadPage: 'http://localhost:4567/' }));
  });
});
