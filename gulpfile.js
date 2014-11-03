var gulp           = require('gulp'),
    $              = require('gulp-load-plugins')();

var startServer = function(){
  gulp.src('./app')
    .pipe($.webserver({
      port: 9000,
      livereload: true,
      fallback: 'index.html',
      proxies: [
        {
          source: '/api', target: 'http://localhost:3000/'
        }
      ]
    }))
};

gulp.task('default',
  function() {
    startServer();
  }
);