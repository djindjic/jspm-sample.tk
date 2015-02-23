[![Build Status](https://travis-ci.org/djindjic/jspm-sample.tk.svg?branch=master)](https://travis-ci.org/djindjic/jspm-sample.tk)

###Instalation
```bash
git clone git@github.com:djindjic/jspm-sample.tk.git && cd jspm-sample.tk
npm install && jspm install
```

###Setup divshot deployment key
```bash
travis env set DIVSHOT_KEY "$(divshot auth:token)"
```

###Start server
```bash
gulp
```
###Testing
```bash
karma start
```
```bash
protractor protractor.conf.js
```
