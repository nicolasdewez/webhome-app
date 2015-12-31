var gulp = require('gulp'),
    tasks = require('gulp-load-plugins')(),
    concat = require('gulp-concat'),
    fs = require('fs'),
    rimraf = require('rimraf'),

    bootstrapPath = 'bower_components/bootstrap/dist/',
    jqueryPath = 'bower_components/jquery/dist/',
    srcPath = 'app/Resources/public/',
    configPath = srcPath + 'config/',
    cssPath = srcPath + 'stylesheets/',
    cssFile = cssPath + 'app.less',
    jsPath = srcPath + 'scripts/',
    bootstrapJsFile = bootstrapPath + 'js/bootstrap.min.js',
    jqueryJsFile = jqueryPath + 'jquery.min.js',
    jsFile = jsPath + '*',
    imgPath = srcPath + 'images/*',
    fontPath = bootstrapPath + 'fonts/*',
    distPath = 'web/',
    distJsCssPath = distPath + 'public/',
    distImgPath = distPath + 'img/',
    distFontPath = distPath + 'fonts/',

    getBrowserify = function(debug) {
        return tasks.browserify({
            debug: debug,
            insertGlobals: false,
            transform: ['babelify']
        });
    };

gulp.task('config', function(callback) {
    fs.readdir(configPath, function(error, list) {
        list.forEach(function(item) {
            if (!item.match(/\.dist$/)) {
                return;
            }

            gulp.src(configPath + item)
                .pipe(tasks.rename(item.replace('.dist', '')))
                .pipe(gulp.dest(configPath));
        });

        callback();
    });
});

gulp.task('envify', ['config'], function() {
    gulp.src('')
        .pipe(tasks.shell(['chmod +x bin/envify.sh', 'sleep 1', 'bin/envify.sh'], { verbose: true }));
});

gulp.task('clean', function(callback) {
    rimraf.sync(distJsCssPath);
    rimraf.sync(distImgPath);
    rimraf.sync(distFontPath);

    callback();
});

gulp.task('css', function() {
    gulp.src(cssFile)
        .pipe(tasks.plumber())
        .pipe(tasks.less())
        .pipe(tasks.autoprefixer())
        .pipe(gulp.dest(distJsCssPath));
});

gulp.task('cssDist', function() {
    gulp.src(cssFile)
        .pipe(tasks.plumber())
        .pipe(tasks.less())
        .pipe(tasks.autoprefixer())
        .pipe(tasks.csso())
        .pipe(gulp.dest(distJsCssPath));
});

gulp.task('js', function() {
    gulp.src(jsFile)
        .pipe(concat('app.js'))
        .pipe(tasks.plumber('app.js'))
        .pipe(getBrowserify(true))
        .pipe(gulp.dest(distJsCssPath));
});

gulp.task('jsDist', function() {
    gulp.src(jsFile)
        .pipe(concat('app.js'))
        .pipe(tasks.plumber())
        .pipe(getBrowserify(false))
        .pipe(tasks.uglify())
        .pipe(gulp.dest(distJsCssPath));
});

gulp.task('img', function() {
    gulp.src(imgPath)
        .pipe(gulp.dest(distImgPath));
});

gulp.task('fonts', function() {
    gulp.src(fontPath)
        .pipe(gulp.dest(distFontPath));
});

gulp.task('jsLib', function() {
    gulp.src([jqueryJsFile, bootstrapJsFile])
        .pipe(gulp.dest(distJsCssPath));
});

gulp.task('livereload', function() {
    tasks.livereload.listen();

    gulp.watch(cssPath + '**/*.less', ['css']);
    gulp.watch(jsPath + '**/*.js', ['js']);
});

gulp.task('default', ['envify', 'clean', 'css', 'js', 'jsLib', 'img', 'fonts', 'livereload']);
gulp.task('dist', ['envify', 'clean', 'cssDist', 'jsDist', 'jsLib', 'img', 'fonts']);
