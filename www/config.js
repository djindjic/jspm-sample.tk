System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "jspm-sample/*": "app/*.js",
    "jspm-sample.tk/*": "app/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.12",
    "angular-material": "github:angular/bower-material@0.7.1",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.12",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "css": "github:systemjs/plugin-css@0.1.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-animate@1.3.13": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-aria@1.3.13": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-mocks@1.3.12": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-material@0.7.1": {
      "angular": "github:angular/bower-angular@1.3.12",
      "angular-animate": "github:angular/bower-angular-animate@1.3.13",
      "angular-aria": "github:angular/bower-angular-aria@1.3.13",
      "css": "github:systemjs/plugin-css@0.1.0"
    }
  }
});

