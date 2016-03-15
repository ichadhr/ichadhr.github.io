var gulp    = require('gulp'),
browserSync = require('browser-sync'),
cp          = require('child_process'),
concat      = require('gulp-concat'),
uglify      = require('gulp-uglify');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', ['copy'], function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--config', '_config-dev.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Uglfiy JS source
 */
gulp.task('uglify', function () {
    gulp.src('assets/js/theme.js')
        .pipe(uglify())
        .pipe(concat('theme.min.js'))
        .pipe(gulp.dest('assets/js'));
});

/* fix bug jekyll not copy js file */
gulp.task('copy', function () {
  return gulp.src('assets/js/**/*')
        .pipe(gulp.dest('_site/assets/js'));
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['assets/js/*.js'], ['uglify']);
    gulp.watch(['_config-dev.yml', '*.html', '_layouts/*.html', '_includes/*.html', '_posts/*', 'assets/css/*.scss', 'assets/js/*.js'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);