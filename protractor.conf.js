var capabilities = require('./sauce_labs_capabilities.js').capabilities;

var configuration = {
  multiCapabilities: [{
    'browserName': 'chrome'
  }],

  specs: ['e2e/spec.js'],

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 360000
  },
};

if(process.env.TRAVIS){
  configuration.multiCapabilities = Object.keys(capabilities).map(function (key) {
    return capabilities[key];
  });
  configuration.sauceUser = process.env.SAUCE_USERNAME;
  configuration.sauceKey = process.env.SAUCE_ACCESS_KEY;
} else {
  configuration.baseUrl = 'http://localhost:9000';
  configuration.directConnect = true;
}

exports.config = configuration;
