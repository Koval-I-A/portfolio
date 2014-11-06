var gulp = require('gulp'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	csso = require('gulp-csso'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    path = require('path');

gulp.task('connect', function() {
  connect.server({
    root: './',
    // port: 8080,
    // host: 'front-end.pp.ua',
    livereload: true
  });
});

// gulp.task('css', function() {
//     gulp.src('./css/dev/style.css')
//         .pipe(rename('style.min.css'))
//         .pipe(csso())
//         .pipe(gulp.dest('./css'))
//         .pipe(connect.reload());
// });

gulp.task('js', function() {
    gulp.src('./js/dev/app.js')
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.start('less');
    gulp.start('js');
    gulp.watch('./js/dev/app.js', function() {
        gulp.start('js');
    });
    gulp.watch('./css/dev/style.less', function() {
        gulp.start('less');
    });
});

gulp.task('less', function () {
  gulp.src('./css/dev/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(rename('style.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('default', ['less', 'js', 'connect', 'watch']);