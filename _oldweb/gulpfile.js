var gulp    = require('gulp'),
browserSync = require('browser-sync'),
cp          = require('child_process'),
concat      = require('gulp-concat'),
sourcemaps  = require('gulp-sourcemaps'),
imagemin    = require('gulp-imagemin'),
pngquant    = require('imagemin-pngquant'),
uglify      = require('gulp-uglify');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', ['uglify', 'copyjs'], function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--config', '_config-dev.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Uglfiy JS source
 */
gulp.task('uglify', function () {
    gulp.src('assets/js/src/*.js')
        .pipe(sourcemaps.init())
         .pipe(concat('theme.min.js'))
         .pipe(uglify())
         .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('assets/js'));
});

/* fix bug jekyll not copy js file */
gulp.task('copyjs', function () {
  return gulp.src('assets/js/**/*')
        .pipe(gulp.dest('_site/assets/js'));
});

/* Minifiy image size */
gulp.task('image', function () {
    return gulp.src('media/posts/**/*', {base: './'})
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant({quality: '65-80', speed: 4})]
        }))
        .pipe(gulp.dest('./'));
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
    gulp.watch(['assets/js/src/*.js'], ['uglify']);
    gulp.watch(['_config-dev.yml', '*.html', '_layouts/*.html', '_includes/*.html', '_posts/*', 'assets/css/*.scss', 'assets/js/src/*.js', 'media/posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);