#Sample-app
##With Angular and [STRAP](https://github.com/pfrankov/STRAP)

###Prerequirements:
* [Node.js with npm](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org) ([for Windows](http://rubyinstaller.org/))

####Grunt
```shell
npm install -g grunt-cli
```
####Sass+Compass
```shell
gem install compass
```
####Install all required packages
In working directory:
```shell
npm install
```

###Execution
`grunt` runs development server  
`grunt test` runs testing server
`grunt build` build project: combine CSS and JS into `dist` directory
