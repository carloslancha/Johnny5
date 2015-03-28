module.exports = function ( grunt ) {
  'use strict';
  // Project configuration
  grunt.initConfig( {
    // Metadata
    pkg: grunt.file.readJSON( 'package.json' ),

    jasmine: {
      test: {
        src: [ 'app/**/*.js' ],
        options: {
          specs: [ 'test/specs/**/*.js' ],
          vendor: [
            "bower_components/jquery/dist/jquery.js",
            "bower_components/jasmine-jquery/lib/jasmine-jquery.js",
          ]
        }
      }
    },
  } );

  // These plugins provide necessary tasks
  grunt.loadNpmTasks( 'grunt-contrib-jasmine' );

  // Default task
  // grunt.registerTask( 'default', [ 'jshint', 'qunit', 'concat', 'uglify' ] );
};