System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
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

