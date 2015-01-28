var Promise = require('promise'),
    gulp    = require('gulp'),
    $       = require('gulp-load-plugins')();
    pkg     = require('./package.json');

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