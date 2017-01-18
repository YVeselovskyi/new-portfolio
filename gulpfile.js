'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');


gulp.task('sass',  () => {
    return gulp.src('public/assets/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css'));
});


gulp.task('default',function() {
    gulp.watch('public/assets/sass/*.sass',['sass']);
});