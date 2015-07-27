require('./support/core_extensions');
var Wrapper = require('./support/wrapper');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    wrap: {
      advanced: {
        expand: true,
        cwd: '../app/assets/javascripts/react_components',
        src: ['**/*.jsx'],
        dest: 'support/compiled/_components',
        options: {
          seperator: '',
          indent: '',
          wrapper: function(filepath, options) {
            var wrapper = new Wrapper(filepath);
            return [wrapper.beforeText(), wrapper.afterText()];
          }
        }
      }
    },
    react: {
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'tests',
            src: ['**/*.jsx'],
            dest: 'support/compiled/spec',
            ext: '.js'
          },
          {
            expand: true,
            cwd: 'support/compiled/_components',
            src: ['**/*.jsx'],
            dest: 'support/compiled/components',
            ext: '.js'
          }
        ]
      }
    },
    execute: {
      target: {
        src: ['run_tests.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-execute');

  // Default task(s).
  grunt.registerTask('compile', ['wrap', 'react']);
  grunt.registerTask('test', ['execute']);
  grunt.registerTask('default', ['wrap', 'react', 'execute']);
};
