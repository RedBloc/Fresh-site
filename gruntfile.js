module.exports = function(grunt) {
	const sass = require('node-sass');
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
	    sass: {
	        options: {
	            implementation: sass,
	            sourceMap: true
	        },
	        dist: {
	            files: {
		            'static/css/source/main.css': 'static/css/source/main.scss'                
	            }
	        }
	    },
	    
		postcss: {
			
			
			options: {
			  map: false, // inline sourcemaps
			  processors: [
			    require('pixrem')(), // add fallbacks for rem units
			    require('autoprefixer')({"overrideBrowserslist": ["defaults"]}), // add vendor prefixes
			    //require('cssnano')() // minify the result
			    
			  ]
			},
			dist: {
			  src: 'static/css/source/main.css',
		      dest: 'static/css/main.css',		  
			}
		},
		
	    concat: {
		    js: {
		        src: [
		            'static/js/libs/*.js', // All JS in the libs folder
		            'static/js/load.js'  // This specific file
		        ],
		        dest: 'static/js/build/production.js',
		    },
	    },
	    
	    uglify: {
	    	build: {
		        src: 'static/js/build/production.js',
	        	dest: 'static/js/build/production.min.js'
	    	}
		},
		
	    
		watch: {
			sass: {
			    files: ['static/css/source/**/*.scss'],
			    tasks: ['sass', 'postcss'],
			    options: {
					implementation: sass, 
			        spawn: false,
					maxListeners: 99		        
			    }
			}  
		}
	    
	    
	});
	grunt.registerTask('default', ["sass", "postcss", "concat", "uglify", "watch"]);
}
