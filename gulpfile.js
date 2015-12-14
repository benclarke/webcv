// Gulp tasks for Portfolio Website

//included tasks
var gulp = require('gulp'),
		gutil = require('gulp-util'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		uglifyjs = require('gulp-uglify'),
		watch = require('gulp-watch'),
		browserSync = require('browser-sync');

// convert sass to css, save to file
gulp.task('styles', function() {
	return gulp.src('wp-content/themes/altitude-pro/source/stylesheets/style.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(gulp.dest('wp-content/themes/altitude-pro'))
	.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: 'localhost:8888'
    });
});

gulp.task('uglifyjs', function() {
	return gulp.src('wp-content/themes/altitude-pro/source/js/grid.js')
	.pipe(uglifyjs())
	.pipe(gulp.dest('wp-content/themes/altitude-pro/js'))
});

gulp.task('watch', function(){
	gulp.watch('wp-content/themes/altitude-pro/source/stylesheets/*.scss', ['styles']);
});