System.config({
  "paths": {
    "*": "*.js",
    "github:*": "https://github.jspm.io/*.js"
  }
});

System.config({
  "depCache": {
    "github:systemjs/plugin-css@0.1.0/css": [],
    "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic": [],
    "github:angular/bower-angular@1.3.3/angular.min": [],
    "github:angular/bower-angular-animate@1.3.3/angular-animate": [
      "github:angular/bower-angular@1.3.3"
    ],
    "github:angular/bower-angular-sanitize@1.3.3/angular-sanitize": [
      "github:angular/bower-angular@1.3.3"
    ],
    "github:angular-ui/ui-router@0.2.10/release/angular-ui-router": [],
    "github:systemjs/plugin-css@0.1.0": [
      "github:systemjs/plugin-css@0.1.0/css"
    ],
    "github:angular/bower-angular@1.3.3": [
      "github:angular/bower-angular@1.3.3/angular.min"
    ],
    "github:angular/bower-angular-animate@1.3.3": [
      "github:angular/bower-angular-animate@1.3.3/angular-animate"
    ],
    "github:angular/bower-angular-sanitize@1.3.3": [
      "github:angular/bower-angular-sanitize@1.3.3/angular-sanitize"
    ],
    "github:angular-ui/ui-router@0.2.10": [
      "github:angular-ui/ui-router@0.2.10/release/angular-ui-router"
    ],
    "github:driftyco/ionic-bower@1.0.0-beta.13/css/ionic.css!github:systemjs/plugin-css@0.1.0": [
      "github:systemjs/plugin-css@0.1.0"
    ],
    "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular": [
      "github:driftyco/ionic-bower@1.0.0-beta.13/css/ionic.css!github:systemjs/plugin-css@0.1.0",
      "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic",
      "github:angular/bower-angular@1.3.3",
      "github:angular/bower-angular-animate@1.3.3",
      "github:angular/bower-angular-sanitize@1.3.3",
      "github:angular-ui/ui-router@0.2.10"
    ],
    "github:driftyco/ionic-bower@1.0.0-beta.13": [
      "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular"
    ],
    "src/main": [
      "github:driftyco/ionic-bower@1.0.0-beta.13",
      "github:angular/bower-angular@1.3.3"
    ]
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@^1.3.3",
    "ionic": "github:driftyco/ionic-bower@1.0.0-beta.13",
    "github:angular/bower-angular-animate@1.3.3": {
      "angular": "github:angular/bower-angular@^1.3.3"
    },
    "github:angular/bower-angular-sanitize@1.3.3": {
      "angular": "github:angular/bower-angular@^1.3.3"
    },
    "github:driftyco/ionic-bower@1.0.0-beta.13": {
      "angular": "github:angular/bower-angular@^1.3.3",
      "css": "github:systemjs/plugin-css@0.1.0",
      "angular-ui-router": "github:angular-ui/ui-router@0.2.10",
      "angular-animate": "github:angular/bower-angular-animate@^1.3.2",
      "angular-sanitize": "github:angular/bower-angular-sanitize@^1.3.2"
    }
  }
});

System.config({
  "versions": {
    "github:angular-ui/ui-router": "0.2.10",
    "github:angular/bower-angular": "1.3.3",
    "github:angular/bower-angular-animate": "1.3.3",
    "github:angular/bower-angular-sanitize": "1.3.3",
    "github:driftyco/ionic-bower": "1.0.0-beta.13",
    "github:systemjs/plugin-css": "0.1.0"
  }
});

