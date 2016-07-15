'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let exec = require('child_process').exec;


gulp.task('sass',  () => {
    return gulp.src('public/assets/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('server',  (cb) => {
    exec('node server.js', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('default', ['sass', 'server']);