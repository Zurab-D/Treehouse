"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      build: {
        files: {
          "build/css/style.css": "src/sass/style.scss"
        }
      },
      watch: {
        files: {
          "src/css/style.css": "src/sass/style.scss"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      build: {
        src: "build/css/*.css"
      },
      watch: {
        src: "src/css/*.css"
      }
    },

    clean: {
      build: ["build", "src/css", "src/js/*.con", "src/js/*.min.js"],
      watch: ["build/*.html", "src/js/*.con"],
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "fonts/**",
            "img/**",
            "*.html",
            "!**/README"
          ],
          dest: "build"
        }]
      },

      watch: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },

    cmq: {
      build: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      },
      watch: {
        files: {
          "src/css/style.css": ["src/css/style.css"]
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      build: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      },
      watch: {
        files: {
          "src/css/style.min.css": ["src/css/style.css"]
        }
      }
    },

    concat: {
      build: {
        src: [
          "src/js/ie10-viewport-bug-workaround.js",
          "src/js/vendor/jquery-1.12.0.min.js",
          "src/js/vendor/owl.carousel.js",
          "src/js/vendor/bootstrap.js",
          "src/js/googleMap.js",
          "src/js/vendor/smooth-menu-scroll.js",
          "src/js/script.js"
        ],
        dest: "build/js/script.js"
      },
      watch: {
        src: [
          "src/js/ie10-viewport-bug-workaround.js",
          "src/js/vendor/jquery-1.12.0.min.js",
          "src/js/vendor/owl.carousel.js",
          "src/js/vendor/bootstrap.js",
          "src/js/googleMap.js",
          "src/js/vendor/smooth-menu-scroll.js",
          "src/js/script.js"
        ],
        dest: "src/js/script.min.js"
      }
    },

    uglify: {
      build: {
        files: {
          "build/js/script.min.js": ["build/js/script.js"]
        }
      },
      /*watch: {
        files: {
          "src/js/script.min.js": ["src/js/script.con"]
        }
      }*/
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },

      style: {
        files: ["src/sass/**/*.scss", "src/sass/*.scss"],
        tasks: ["sass:watch", "cmq:watch", "postcss:watch", "cssmin:watch"],
        options: {
          spawn: false,
          livereload: true
        }
      },

      script: {
        files: ["src/js/**/*.js", "!src/js/**/*.min.js"],
        //tasks: ["concat:watch", "uglify:watch"],
        tasks: ["concat:watch"],
        options: {
          spawn: false,
          livereload: true
        }
      },

      html: {
        files: ["src/*.html"],
        tasks: ["clean:watch", "copy:watch"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }

  };

  grunt.registerTask("build", [
    "clean:build"
    ,"copy"
    ,"sass:build"
    ,"cmq:build"
    ,"postcss:build"
    ,"cssmin:build"
    ,"concat:build"
    ,"uglify:build"
    ,"imagemin"
  ]);


  grunt.initConfig(config);
};
