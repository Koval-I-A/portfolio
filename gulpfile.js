var gulp = require('gulp'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	csso = require('gulp-csso');

gulp.task('connect', function() {
  connect.server({
    root: './',
    // port: 8080,
    // host: 'front-end.pp.ua',
    livereload: true
  });
});

gulp.task('css', function() {
    gulp.src('./css/dev/style.css')
        .pipe(rename('style.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('./js/dev/app.js')
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.start('css');
    gulp.start('js');
    gulp.watch('./js/dev/app.js', function() {
        gulp.start('js');
    });
    gulp.watch('./css/dev/style.css', function() {
        gulp.start('css');
    });
});

gulp.task('default', ['css', 'js', 'connect', 'watch']);