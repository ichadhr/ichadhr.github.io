var gulp    = require('gulp'),
cp          = require('child_process'),
concat      = require('gulp-concat'),
sourcemaps  = require('gulp-sourcemaps')
uglify      = require('gulp-uglify');

gulp.task('jekyll-build', ['uglify'], function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('uglify', function () {
    gulp.src('assets/js/src/*.js')
        .pipe(sourcemaps.init())
         .pipe(concat('theme.min.js'))
         .pipe(uglify())
         .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('default', ['jekyll-build']);