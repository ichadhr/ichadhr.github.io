var gulp    = require('gulp'),
browserSync = require('browser-sync'),
cp          = require('child_process'),
rename      = require('gulp-rename'),
concat      = require('gulp-concat'),
sourcemaps  = require('gulp-sourcemaps'),
uglify      = require('gulp-uglify');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var copyme = function() {
    copyjs();
    copymap();
    copylogo();
};

var copylogo = function() {
    return gulp.src('assets/img/*.svg')
        .pipe(gulp.dest('_site/assets/img'))
};

var copyjs = function() {
    return gulp.src('assets/js/*.js')
        .pipe(gulp.dest('_site/assets/js'));
};

var copymap = function() {
    return gulp.src('assets/js/maps/*.map')
        .pipe(gulp.dest('_site/assets/js/maps'));
};

/**
 * Build the Jekyll Site
 */
gulp.task('generate-jekyll', ['pagejs', 'corejs'], function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--config', '_config-dev.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Uglfiy JS source
 */
gulp.task('corejs', function () {
    return gulp.src(['assets/js/src/core/vendor/*.js', 'assets/js/src/core/*.js'], { base: 'assets/js/src' })
        .pipe(sourcemaps.init())
        .pipe(concat('core.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('pagejs', function () {
    return gulp.src('assets/js/src/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('assets/js'));
});

/* fix bug jekyll not copy js file */
gulp.task('copyjs', function () {
  return gulp.src(['assets/js/**/*.js', 'assets/js/maps/*.map'])
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
gulp.task('jekyll-rebuild', ['generate-jekyll'], function () {
    browserSync.reload();

    copyme();
});

/**
 * Reload browser without rebuild jekyll
 */
gulp.task('corejs-reload', ['corejs'], function () {
    browserSync.reload();
    copyme();
});

gulp.task('pagejs-reload', ['pagejs'], function () {
    browserSync.reload();
    copyme();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['generate-jekyll'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });

    copyme();

});

/**
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['assets/js/src/core/**/*.js'], ['corejs-reload']);
    gulp.watch(['assets/js/src/*.js'], ['pagejs-reload']);
    gulp.watch(['_config-dev.yml', '*.html', '_layouts/*.html', '_includes/*.html', '_posts/*', 'assets/css/*.sass', 'assets/_sass/**/*', 'media/posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);