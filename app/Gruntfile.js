'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);

  require('jit-grunt')(grunt, {
    'watch': 'grunt-contrib-watch',
    'connect': 'grunt-contrib-connect',
    'jshint': 'grunt-contrib-jshint',
    'wiredep': 'grunt-wiredep',
    'includeSource': 'grunt-include-source',
    'ngconstant': 'grunt-ng-constant',
    'sass': 'grunt-sass',
    'concat': 'grunt-contrib-concat'
  });

  grunt.initConfig({

    // Project settings
    config: {
      src: 'src',
      app: 'src/app',
      components: 'src/app/components',
      config: 'src/app/config',
      assets: 'src/app/assets',
    },

    ngconstant: {
      options: {
        name: 'app.config',
        wrap: '\'use strict\';\n\n{%= __ngModule %}',
        space: '  ',
        dest: '<%= config.config %>/config.js'
      },
      dev: {
        constants: grunt.file.readJSON('env.json').development
      },
      prod: {
        constants: grunt.file.readJSON('env.json').production
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {

      // Configure when files should be reloaded in the browser
      livereload: {
        options: {
          livereload: '<%= connect.livereload.options.livereload %>'
        },
        files: [
          '<%= config.app %>/**/*.html',
          '<%= config.app %>/**/*.js',
          '<%= config.app %>/**/*.css',
          '<%= config.app %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'bower.json',
          '<%= config.src %>/index.html'
        ]
      },

      // Compile sass to css when sass files edited
      sass: {
        files: ['<%= config.components %>/**/*.scss'],
        tasks: ['concat:sass', 'sass']
      },

      // Configure updating dependecies when bower file changed
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },

      // Run jshint every time js files changed
      jshint: {
        files: ['<%= config.app %>/**/*.js', 'Gruntfile.js'],
        tasks: ['newer:jshint:all']
      },

      // Configure updating source file references in index.html file when new files added/deleted
      includeSource: {
        options: {
          event: ['added', 'deleted']
        },
        files: [
          '<%= config.app %>/**/*.js',
          '<%= config.app %>/**/*.css'
        ],
        tasks: ['includeSource']
      },
    },

    // Concatinate scss files from each component
    concat: {
      sass: {
        src: [
          '<%= config.assets %>/**/*.scss',
          '!<%= config.assets %>/scss/temp.scss',
          '<%= config.components %>/**/*.scss',
        ],
        dest: '<%= config.assets %>/scss/temp.scss',
      }
    },


    // Configure sass to css compilation
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '<%= config.assets %>/main.css' : '<%= config.assets %>/scss/temp.scss'
        }
      }
    },



    // The actual grunt server settings
    connect: {
      options: {
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        // Live reload script will be inserted if livereload parameter supplied
        base: '<%= config.src %>'
      },
      livereload: {
        options: {
          // Open browser
          port: 9001,
          livereload: 35730,
          open: true
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/**/*.js'
      ]
    },

    // Configure automatically injecting controllers, directives etc to index.html
    includeSource: {
      options: {
        basePath: '<%= config.src %>',
        baseUrl: ''
      },
      app: {
        files: {
          '<%= config.src %>/index.html': '<%= config.src %>/index.html'
        }
      }
    },

    // Automatically inject Bower components into the src
    wiredep: {
      app: {
        src: ['<%= config.src %>/index.html'],
        ignorePath: /\.\.\//
      }
    }
  });


  grunt.registerTask('default', function(env){
    env = env ? env : 'dev';
    grunt.task.run(['ngconstant:' + env, 'concat:sass', 'sass', 'wiredep', 'includeSource', 'connect:livereload', 'watch']);
  });
};