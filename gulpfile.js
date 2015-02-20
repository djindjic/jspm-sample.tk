var Promise = require('promise'),
    gulp    = require('gulp'),
    $       = require('gulp-load-plugins')();
    cachebust = new $.cachebust;

var startServer = function(){
  return new Promise(function (fulfil) {
    gulp.src('./www')
      .pipe($.webserver({
        port: 9000,
        livereload: true,
        fallback: 'index.html'
      }))
      .on('end', fulfil);
  });
};

gulp.task('default',
  function() {
    startServer();
  }
);

gulp.task('bust-config', function () {
  return gulp.src('www/config.js')
      .pipe(cachebust.resources())
      .pipe($.uglify())
      .pipe(gulp.dest('www'));
});

gulp.task('build-index', ['bust-config'], function () {
  return gulp.src('www/index.html')
      .pipe(cachebust.references())
      .pipe($.htmlmin({
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeComments: true
      }))
      .pipe(gulp.dest('www'));
});
