var capabilities = require('./sauce_labs_capabilities.js').capabilities;

module.exports = function(config) {
  var configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'mocha', 'chai'],

    jspm: {
      // Edit this to your needs
      loadFiles: ['www/app/**/*.spec.js'],
      serveFiles: ['www/app/**/*.js']
    },

    proxies: {
      '/base/jspm_packages/': '/base/www/jspm_packages/'
    },

    // list of files / patterns to load in the browser
    files: [
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['saucelabs', 'mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    browserDisconnectTimeout: 10 * 1000, // 10s
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 2 * 60 * 1000, // 2m
    captureTimeout: 0,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  };

  if(process.env.TRAVIS){
    configuration.customLaunchers = capabilities;
    configuration.browsers = Object.keys(capabilities);
  }

  config.set(configuration);
};
