'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');


gulp.task('sass',  () => {
    return gulp.src('public/assets/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css'));
});


gulp.task('default', ['sass']);