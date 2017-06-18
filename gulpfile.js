'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

gulp.task('copy', function () {
    return gulp
        .src([
            'node_modules/bootstrap-sass/assets/fonts/**/*'
        ])
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('default', [
    'copy',
    'sass',
    'test',
    'uglify',
    'sass:watch',
    'uglify:watch'
]);

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
    return gulp
        .src('test/runner.html')
        .pipe(mochaPhantomJS());
});

gulp.task('uglify', function () {
    return gulp.src('build/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('uglify:watch', function () {
    gulp.watch('build/js/**/*.js', ['uglify']);
});
