System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@^1.3.1",
    "ionic": "github:driftyco/ionic@^0.9.27",
    "github:driftyco/ionic@0.9.27": {
      "css": "github:systemjs/plugin-css@0.1.0",
      "angular": "github:angular/bower-angular@^1.3.1"
    }
  }
});

System.config({
  "versions": {
    "github:driftyco/ionic": "0.9.27",
    "github:systemjs/plugin-css": "0.1.0",
    "github:angular/bower-angular": "1.3.1"
  }
});

