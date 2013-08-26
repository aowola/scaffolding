/* global module:false */
module.exports = function(grunt) {

  // Scaffolding configuration.
  var config = {
    srv: "server",
    src: "assets",
    tmp: ".tmp",
    lib: "libs"
  };

  var port = grunt.option('port') || 9000,
  livereload = typeof(grunt.option('port')) === "boolean" ? grunt.option('port') : false;
  grunt.verbose.write("Setting Connect Port to" + port);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    app: config,
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      tmp: ['<%= app.tmp %>/*']
    },
    copy: {
      javascript: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/scripts/',
          src:['{,*/}*.{js}'],
          dest:'<%= app.tmp %>/scripts/'
        }]
      },
      requirejs: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/lib/requirejs',
          src:['require.js'],
          dest:'<%= app.tmp %>/scripts/lib'
        }]
      },
      favicon: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>',
          src:['{,*/}*.ico'],
          dest:'<%= app.tmp %>'
        }]
      },
      fonts: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/fonts/',
          src:['{,*/}*.{eot,svg,ttf,woff}'],
          dest:'<%= app.tmp %>/fonts/'
        }]
      },
      images: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/img/',
          src:['{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
          dest:'<%= app.tmp %>/img/'
        }]
      },
      views: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/views/',
          src:['{,*/}*.{html,xhtml}'],
          dest:'<%= app.tmp %>'
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          'define':true,
          'require':true,
          'requirejs':true
        },
        ignores: ['<%= app.src %>/scripts/templates/templates.js']
      },
      gruntfile: {
        src: 'gruntfile.js'
      },
      javascript:{
        files: [{
          expand:true,
          cwd:'<%= app.src %>/scripts/',
          src:['{,*/}*.js']
        }]
      }
    },
    sass: {
      options: {
        compass: true,
        cacheLocation: '.sass-cache',
        loadPath:[]
      },
      tmp: {
        files:[{'<%= app.tmp %>/styles/main.css':'<%= app.src %>/styles/main.scss'}]
      }
    },
    hogan: {
      compile_server: {
        options: {
          namespace: 'templates',
          prettify: true,
          commonJsWrapper: true,
          defaultName: function(filename) {
            return filename.split('/').pop().replace('.hogan', '');
          }
        },
        files:{
          "<%= app.srv %>/templates.js": ["<%= app.src %>/templates/**/*.hogan"]
        }
      },
      compile_client: {
        options: {
          namespace: 'templates',
          prettify: true,
          amdWrapper:true,
          amdRequire: {
            hogan: "Hogan"
          },
          defaultName: function(filename) {
            return filename.split('/').pop().replace('.hogan', '');
          }
        },
        files:{
          "<%= app.src %>/scripts/templates/templates.js": ["<%= app.src %>/templates/**/*.hogan"]
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: "<%= app.src %>/scripts",
          mainConfigFile: "<%= app.src %>/scripts/main.js",
          out: "<%= app.tmp %>/scripts/main.js"/*,
          optimize : 'none',*/
        }
      }
    },
    express: {
      options: {
        args: ['public=<%= app.tmp %>']
      },
      server: {
        options: {
          port: port,
          script: './server/server.js'
        }
      }
    },
    watch: {
      options: { livereload: livereload },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'default']
      },
      javascript: {
        files: ['<%= app.src %>/scripts/{,*/}*.js'],
        tasks: ['jshint:javascript', 'requirejs:compile']
      },
      sass: {
        files: ['<%= app.src %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:tmp']
      },
      views: {
        files: ['<%= app.src %>/views/{,*/}*.html'],
        tasks: ['copy:views']
      },
      images: {
        files: ['<%= app.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}'],
        tasks: ['copy:images']
      },
      fonts: {
      files: ['<%= app.src %>/fonts/{,*/}*.{eot,svg,ttf,woff}'],
        tasks: ['copy:fonts']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-hogan');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', [
    'jshint:gruntfile',
    'jshint:javascript',
    'clean:tmp',
    'hogan:compile_client',
    'hogan:compile_server',
    'requirejs:compile',
    'sass:tmp',
    'copy:requirejs',
    'copy:fonts',
    'copy:favicon',
    'copy:images',
    'copy:views'
  ]);

  grunt.registerTask('serve', ['default', 'express', 'watch']);
};
