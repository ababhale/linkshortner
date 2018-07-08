var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');

var path = require('./gulpconfig.js');


gulp.task('copy', () => {
	return gulp.src(path.HTML.concat(path.COPY_ASSETS))
		.pipe(gulp.dest(path.DEST));
});

gulp.task('watch', () => {
	gulp.watch(path.ALL, ['build']);
	gulp.watch(path.PROJECT_SCSS, ['build-sass']);
});

gulp.task('build', ['copy'], () => {
	browserify({
		entries: [path.ENTRY_POINT]
	})
	.transform(babelify)
	.bundle()
	.pipe(source('build.js'))
	.pipe(gulp.dest(path.DEST));

	browserify({
		entries: [path.VENDOR_JS]
	})
	.transform(babelify)
	.bundle()
	.pipe(source('vendors.js'))
	.pipe(gulp.dest(path.DEST));
		
});

gulp.task('build-sass', () => {
	gulp.src(path.FOUNDATION_PATH)
		.pipe(sass())
		.pipe(gulp.dest(path.DEST));

	gulp.src(path.PROJECT_SCSS)
		.pipe(sass())
		.pipe(concat('project.css'))
		.pipe(gulp.dest(path.DEST));
});

gulp.task('default', ['build', 'build-sass', 'watch'], function () {
	//runSequence('start-server');
});