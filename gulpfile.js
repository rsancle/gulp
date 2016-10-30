var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var notify = require('gulp-notify');
var concat = require('gulp-concat');

var nodeModulesPath = './node_modules/';

/*Scripts task*/
gulp.task('scripts', function(){
  return gulp.src([
      //nodeModulesPath + 'jquery-1x/node_modules/jquery/dist/jquery.min.js',
      nodeModulesPath + 'owl.carousel/dist/owl.carousel.min.js',
      './assets/custom/js/*.js'

    ])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(notify('scripts task finished'))
}).on('error', onError);

/*SASS*/
gulp.task('sass',function(){
    gulp.src(['assets/custom/scss/**/*.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(gulp.dest(''))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(''))
        .pipe(notify('css task finished'))
}).on('error', onError);

gulp.task('watch',function(){
    gulp.watch('assets/custom/scss/**/*.scss',['sass']);
    gulp.watch("assets/custom/js/**/*.js", ['scripts']);
});

gulp.task('default',['scripts', 'sass']);


function onError(err) {
  console.log(err);
  this.emit('end');
}
