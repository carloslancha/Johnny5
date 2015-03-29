module.exports = function ( grunt ) {
  'use strict';
  grunt.initConfig( {

    jshint: {
      options: {
        jshintrc: true,
        reporter: require( 'jshint-stylish' )
      },
      all: 'app/**/*.js'
    },

    jasmine: {
      test: {
        src: [ 'app/**/*.js' ],
        options: {
          specs: [ 'test/specs/**/*.js' ],
          vendor: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
          ]
        }
      }
    },

    uglify: {
      js: {
        files: {
          'dist/Johnny5.min.js': [ 'app/Johnny5.js' ]
        }
      }
    }
  } );

  // These plugins provide necessary tasks
  grunt.loadNpmTasks( 'grunt-contrib-jasmine' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );

  // Default task
  grunt.registerTask( 'test', [
    'jshint',
    'jasmine:test'
  ] );

  grunt.registerTask( 'build', [
    'jshint',
    'jasmine:test',
    'uglify'
  ] );
};