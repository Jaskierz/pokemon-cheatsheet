'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');

gulp.task('copy', function () {
    return gulp
        .src([
            'node_modules/bootstrap-sass/assets/fonts/**/*'
        ])
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('default', ['copy', 'sass', 'test', 'sass:watch']);

gulp.task('sass', function () {
    return gulp.src('build/sass/**/*.scss')
        .pipe(sass({
            includePaths: [
                'node_modules/bootstrap-sass/assets/stylesheets'
            ],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('build/sass/**/*.scss', ['sass']);
});

gulp.task('test', function () {
    gulp.src('build/test/**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
});
