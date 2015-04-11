module.exports = function (grunt, config) {
  "use strict";

  var scssDir;
  var scssConfigRoot;
  
  if (config.scssDir) {
    scssDir = config.scssDir;
  } else {
    scssDir = "scss/";
  }

  if (config.scssConfigRoot) {
    scssConfigRoot = config.scssConfigRoot;
  } else {
    scssConfigRoot = "./";
  }
  
  grunt.config.merge({
    shell: {
      stylesCompile: {
        command: "cd " + scssConfigRoot + " && bundle exec compass compile"
      }
    },
    scsslint: {
      "options": {
        "bundleExec": scssConfigRoot,
        "config": scssConfigRoot + ".scss-lint.yml",
        "force": true,
        "maxBuffer": 999999,
        "colorizeOutput": true,
        "compact": true
      },
      styles: {
        src: "<%= watch.styles.files %>"
      }
    },
    watch: {
      styles: {
        files: scssDir + "**/*.scss",
        tasks: [
          "shell:stylesCompile",
          "newer:scsslint:styles" // only lint the newly change files
        ]
      }
    }
  });

  grunt.registerTask("stylesCompile", ['shell:stylesCompile']);

};