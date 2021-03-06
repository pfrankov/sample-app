module.exports = function(grunt) {
	var config = {
		zip: false, // Archive dist dir after build

		app: "app",
		sass: "sass",
		styles: "styles",
		images: "images",
		scripts: "scripts",

		dist: "dist",


		copyIgnore: [
			"bower_components/**",
			"includes/**",
			"<%= config.scripts %>/angular/**",
			"<%= config.sass %>/**",
			"<%= config.images %>/**"
		],
		useSTRAPbanner: false
	};



	

	




	/**
	 *
	 * @param {Array} paths
	 */
	function makePathIgnored (paths){
		var result = [];

		for (var i=0; i<paths.length; i++) {
			result[i] = "!"+paths[i];
		}
		//console.log(result);

		return result;
	}

	//require("time-grunt")(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		config: config,

		paths: {
			app: "<%= config.app %>",
				sass: "<%= config.app %>/<%= config.sass %>",
				styles: "<%= config.app %>/<%= config.styles %>",
				scripts: "<%= config.app %>/<%= config.scripts %>",
				images: "<%= config.app %>/<%= config.images %>",
				tmp: "<%= config.app %>/.tmp",

			dist: "<%= config.dist %>"
		},

		

		banner: "/*\n"+
			"*   ------------------------------------------------\n"+
			"*      [★] STRAP on Sass v1.0.1\n"+
			"*      Compass responsive boilerplate + framework\n"+
			"*   ------------------------------------------------\n"+
			"*   Author: Pavel Frankov   twitter: @twenty\n"+
			"*   Fork me on Github: https://github.com/pfrankov/strap\n"+
			"*\n"+
			"*/",


		browserify: {
			angular: {
				files: {
					"<%= paths.tmp %>/scripts/angular/app.js": ["<%= paths.scripts %>/angular/app.js"]
				}
			}
		},
		
		
		imagemin: {
			images: {
				files: [{
					expand: true,
					cwd: "<%= paths.app %>/",
					src: ["<%= config.images %>/**/*.{png,jpg,gif}", "!<%= config.images %>/**/_*/**"],
					dest: "<%= paths.dist %>/"
				}]
			}
		},

		csso: {
			usemin: {
				options: {
					force: true,
					restructure: true,
					report: 'gzip'
				},
				files: [{

					expand: true,
					cwd: "<%= paths.tmp %>/usemin/",
					src: ["**/*.css"],
					dest: "<%= paths.tmp %>/usemin/",
					ext: ".css"
				}]
			}
		},
		
		uglify: {
			options: {
				mangle: false
			}
		},

		useminPrepare: {
			html: "<%= paths.app %>/*.html",

			options: {
				dest: "<%= paths.tmp %>/usemin",
				flow: {
					steps: {
						js: ["uglifyjs"],
						css: ["concat"]
					},
					post: {
						js: [{
							name: "uglify",
							createConfig: function(context){
								var copyTask = grunt.config("copy");
								copyTask.assets.src = copyTask.assets.src.concat(makePathIgnored(context.inFiles));

								grunt.config("copy", copyTask);
							}
						}],
						css: [{
							name: "concat",
							createConfig: function(context, block){
								var copyTask = grunt.config("copy");
								copyTask.assets.src = copyTask.assets.src.concat(makePathIgnored(context.inFiles));

								grunt.config("copy", copyTask);


								var usebannerTask = grunt.config("usebanner");
								usebannerTask.banner.files.src = usebannerTask.banner.files.src.concat("<%= paths.dist %>/" + block.dest);

								grunt.config("usebanner", usebannerTask);
							}
						}]
					}
				}
			}
		},

		usemin: {
			html: "<%= paths.dist %>/*.html"
		},

		clean: {
			tmp: "<%= paths.tmp %>",
			dist: "<%= paths.dist %>"
		},

		copy: {
			usemin: {
				expand: true,
				cwd: "<%= paths.tmp %>/usemin/",
				src: "**",
				dest: "<%= paths.dist %>/"
			},
			html: {
				expand: true,
				cwd: "<%= paths.app %>/",
				src: ["*.html"],
				dest: "<%= paths.dist %>/"
			},
			assets: {
				expand: true,
				cwd: "<%= paths.app %>/",
				src: ["**/*", "!*.html"].concat(makePathIgnored(config.copyIgnore) ),
				dest: "<%= paths.dist %>/"
			}
		},

		sass: {
			tmp: {
				options: {
					compass: true,
					sourcemap: "file"
				},
				files: [{
					expand: true,
					cwd: "<%= paths.sass %>",
					src: ["*.scss"],
					dest: "<%= paths.tmp %>",
					ext: ".css"
				}]
			}
		},

		autoprefixer: {
			tmp: {
				options: {
					map: true
				},
				expand: true,
				flatten: true,
				src: "<%= paths.tmp %>/**/*.css",
				dest: "<%= paths.sass %>"
			}
		},

		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				hostname: "localhost"
			},
			livereload: {
				options: {
					open: true,
					base: [
						"<%= paths.app %>"
					]
				}
			},
			test: {
				options: {
					base: [
						"<%= paths.app %>"
					]
				}
			},
			testDist: {
				options: {
					base: [
						"<%= paths.dist %>"
					]
				}
			}
		},

		watch: {
			js: {
				files: ["<%= paths.scripts %>/**/*.js"],
				tasks: ["build:dev:js"],
				options: {
					spawn: false,
					livereload: true
				}
			},
			sass: {
				files: ["<%= paths.sass %>/**/*.scss"],
				tasks: ["build:dev:css"],
				options: {
					spawn: false
				}
			},
			css: {
				files: ["<%= paths.styles %>/**/*.css"],
				options: {
					spawn: false,
					livereload: true
				}
			},
			html: {
				files: ["<%= paths.app %>/**/*.html"],
				options: {
					spawn: false,
					livereload: true
				}
			},
			
			test: {
				files: ["test/spec/**/*.js", "app/.tmp/**/*.js"],
				tasks: ["karma:unit"],
				options: {
					spawn: true,
					interval: 10
				}
			}
		},

		size_report: {
			your_target: {
				files: {
					list: ["<%= paths.dist %>/**/*.{html,css,js,jpg,png,gif,webp,zip}"]
				}
			}
		},

		zip: {
			task: {
				cwd: "<%= paths.dist %>/",
				src: ["<%= paths.dist %>/**/*"],
				dest: "<%= paths.dist %>/<%= pkg.name %>-v<%= pkg.version %>.zip"
			}
		},

		bump: {
			options: {
				files: ["package.json"],
				updateConfigs: ["pkg"],
				commit: false,
				createTag: false,
				push: false
			}
		},

		usebanner: {
			banner: {
				options: {
					position: "top",
					banner: "<%= banner %>",
					linebreak: true
				},
				files: {
					src: []
				}
			}
		},
		markdown: {
			all: {
				files: [
					{
						expand: true,
						src: "*.md",
						dest: "",
						ext: ".html"
					}
				]
			}
		},
		karma: {
			unit: {
				options: {
					configFile: "./test/karma.conf.js",
					files: [
						"app/.tmp/usemin/scripts/vendor.js",
						"app/.tmp/scripts/angular/**/*.js",
						"test/spec/**/*.js"
					]
				}
			},
			dist: {
				options: {
					configFile: "./test/karma.conf.js",
					files: [
						"dist/scripts/vendor.js",
						"dist/scripts/combined.js",
						"test/spec/**/*.js"
					]
				}
			}
		}
	});

	require("jit-grunt")(grunt, {
		useminPrepare: "grunt-usemin"
	});

	grunt.registerTask("build:dev:css", [
		"sass:tmp",
		"autoprefixer:tmp"
	]);

	grunt.registerTask("build:dev:js", [
		"browserify"
	]);

	grunt.registerTask("test:js", [
		"useminPrepare",
		"concat:generated",
		"uglify:generated"
	]);
	
	
	



	grunt.registerTask("default", [
		"build:dev:css",
		"build:dev:js",
		"connect:livereload",
		"watch:css",
		"watch:js",
		"watch:html",
		"watch:sass"
	]);
	
	grunt.registerTask("build", function(){
		grunt.task.run([
			"clean:dist",
			"bump",
			"build:dev:css",
			"build:dev:js",
			"useminPrepare",
			"concat:generated",
			"uglify:generated",
			"csso:usemin",
			"copy:usemin",
			"copy:html",
			"usemin",
			"imagemin",
			"copy:assets",
			"connect:testDist",
			"karma:dist",
			"clean:tmp"
		]);

		if ( grunt.config.get("config" ).useSTRAPbanner ) {
			grunt.task.run([
				"usebanner"
			]);
		}
		if ( grunt.config.get("config" ).zip ) {
			grunt.task.run([
				"zip"
			]);
		}
		grunt.task.run([
			"size_report"
		]);
	});

	grunt.registerTask("test", [
		"build:dev:css",
		"test:js",
		"connect:test",
		"karma:unit",
		"watch"
	]);

};

