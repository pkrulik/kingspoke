var gulp = require('gulp'),  
	hb = require('gulp-hb'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    landingPages = require('./src/data/landingPages-config.json'),
    notify = require("gulp-notify"),
    headerfooter = require('gulp-headerfooter'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    minify = require('gulp-minify'),
    livereload = require('gulp-livereload'),
    cachebust = require('gulp-cache-bust'),
    imagemin = require('gulp-imagemin');
    cleanCSS = require('gulp-clean-css'),
    sitemap = require('gulp-sitemap'),
	stripDebug = require('gulp-strip-debug');    

	
	
	
	
	
	gulp.task('imagemin', function () {
	  gulp.src('src/srcimgs/**/*')
	    .pipe(imagemin())
	    .pipe(gulp.dest('build/img'));
	});
	
	
	
	
	gulp.task('sitemap', function () {
	    gulp.src('build/**/*.html', {
	            read: false
	        })
	        .pipe(sitemap({
	            siteUrl: 'http://www.kingspoke.co'
	        }))
	        .pipe(gulp.dest('build/'));
	});	
	
	

	gulp.task('generateHTML:allLandingPages', function() {  
	
		for(var i=0; i<landingPages.length; i++) {
			
		    var landingPagesContent = landingPages[i],
	        	fileName = landingPagesContent.pageName.replace(/ +/g, '-').toLowerCase(),
	        	
				options = {
			        batch : ['src/partials'],
			    }	        	
	        			
		    gulp.src('src/templates/' + fileName + '.handlebars')
		        .pipe( handlebars(landingPagesContent, options) )
		        .pipe( rename("index.html") )
		        .pipe( gulp.dest('build/' + fileName) )
		        .pipe(notify( fileName + ' built'));
				
			
/*
			if (landingPagesContent.pageName == "index") {
				
			    gulp.src('src/templates/' + fileName + '.handlebars')
			        .pipe( handlebars(landingPagesContent, options) )
			        .pipe( rename("index.html") )
			        .pipe( gulp.dest('build/') )
			        .pipe(notify( fileName + ' built'));
				
			}
*/
			
			if ( landingPagesContent.pageName == "work") {
								
				var projects = landingPages[i].projects
				
				for(var j=0; j<projects.length; j++) {
					
					var project = projects[j]
		        	fileName = project.workPageContent.pageName.replace(/ +/g, '-').toLowerCase();
		        	
		        	console.log(fileName)
		
				    gulp.src('src/templates/case-study.handlebars')
/*
				        .pipe(headerfooter.header('./src/includes/header.html'))
						.pipe(headerfooter.footer('./src/includes/footer.html'))
*/
				        .pipe( handlebars(project, options) )
				        .pipe( rename("index.html") )
				        .pipe( gulp.dest('build/' + fileName) )
				        .pipe(notify(fileName + ' casestudy built'));
							        
		        }
			} 
		}
	});
	
	
	gulp.task('js', function() {
		
		return gulp.src('src/js/main.js')
			.pipe(stripDebug())
			.pipe( minify() )
			.pipe(cachebust({type: 'timestamp'}))
		    .pipe( gulp.dest('build/js') )
		    .pipe( livereload() )
		    .pipe(notify('js built'));
	});
	
	
	// convert sass to css
	gulp.task('sass', function() {
		
		return gulp.src('src/css/main.scss')
			.pipe( sass() )
			.pipe( cleanCSS() )
			.pipe(cachebust({type: 'timestamp'}))
			.pipe( rename("main-min.css") )
			.pipe( gulp.dest('build/css/') )
			.pipe( livereload() )
			.pipe(notify('sass built'));
		
	});
	
	// run this so that we can watch the files
	gulp.task('watch', function() {
	  
	  gulp.watch('src/css/*.scss', ['sass']);
	  gulp.watch('src/data/*.json', ['runAllHTML']);
	  gulp.watch('src/includes/*.html', ['runAllHTML']);
	  gulp.watch('src/js/*.js', ['js']);
	  gulp.watch('src/templates/*.handlebars', ['runAllHTML']);
	  livereload.listen();
	  
	});
	
	
	gulp.task('runAllHTML', ['generateHTML:allLandingPages'])
	
	gulp.task ('run', ['runAllHTML','sass', 'js', 'watch'])
	
	
	
	
	












/*
	gulp.task('generateHTML:allLandingPages', function() {  
	
		for(var i=0; i<landingPages.length; i++) {
	    
		    var landingPagesContent = landingPages[i],
	        	fileName = landingPagesContent.pageName.replace(/ +/g, '-').toLowerCase();
		
		    gulp.src('src/templates/' + fileName + '.handlebars')
		        .pipe(headerfooter.header('./src/includes/header.html'))
				.pipe(headerfooter.footer('./src/includes/footer.html'))
		        .pipe( handlebars(landingPagesContent) )
		        .pipe( rename("index.html") )
		        .pipe( gulp.dest('build/' + fileName) )
		        .pipe(notify( fileName + 'built'));

	    }
	
	});
	
	
	
	gulp.task('generateHTML:caseStudies', function() {  
	
		for(var i=0; i<caseStudies.length; i++) {
			
			if (caseStudies[i].pageName == "Work") {
				
				var projects = caseStudies[i].projects
				
				for(var j=0; j<projects.length; j++) {
					
					var project = projects[j]
		        	fileName = project.workPageContent.pageName.replace(/ +/g, '-').toLowerCase();
		
			    gulp.src('src/templates/case-study.handlebars')
			        .pipe(headerfooter.header('./src/includes/header.html'))
					.pipe(headerfooter.footer('./src/includes/footer.html'))
			        .pipe( handlebars(project) )
			        .pipe( rename("index.html") )
			        .pipe( gulp.dest('build/' + fileName) )
			        .pipe(notify(fileName + ' casestudy built'));
							        
		        }
			}
		        		
					
		}
	
	});
*/






/*
	gulp.task('generateHTML:employees', function() {  
	
		for(var i=0; i<employees.length; i++) {
		    
		    var employee = employees[i],
		        fileName = employee.fullName.replace(/ +/g, '-').toLowerCase();
		
		    gulp.src('src/templates/employee.handlebars')
		        .pipe(headerfooter.header('./src/includes/header.html'))
				.pipe(headerfooter.footer('./src/includes/footer.html'))
		        .pipe( handlebars(employee) )
		        .pipe( rename(fileName + ".html") )
		        .pipe( gulp.dest('build/who-we-are') )
		        .pipe(notify('employee profile built'));
		}
	
	});
*/


/*
		    var caseStudyContent = caseStudies[i],
	        	fileName = caseStudyContent.pageName.replace(/ +/g, '-').toLowerCase();
		
		    gulp.src('src/templates/case-study.handlebars')
		        .pipe(headerfooter.header('./src/includes/header.html'))
				.pipe(headerfooter.footer('./src/includes/footer.html'))
		        .pipe( handlebars(caseStudyContent) )
		        .pipe( rename(fileName + ".html") )
		        .pipe( gulp.dest('build/work/') )
		        .pipe(notify(fileName + ' casestudy built'));
	        
	    }
*/

/*
gulp.task('generateHTML:index', function() {  

	for(var i=0; i<index.length; i++) {
    
	    var indexContent = index[i];
	
	    gulp.src('src/templates/index.handlebars')
	        .pipe(headerfooter.header('./src/includes/header.html'))
			.pipe(headerfooter.footer('./src/includes/footer.html'))
	        .pipe( handlebars(indexContent) )
	        .pipe( rename("index.html") )
	        .pipe( gulp.dest('build/index') )
	        .pipe(notify('index built'));
        
        
    }

});


gulp.task('generateHTML:workLanding', function() {  

	    var workLandingContent = workLanding[0];
	
	    gulp.src('src/templates/work-landing.handlebars')
	        .pipe(headerfooter.header('./src/includes/header.html'))
			.pipe(headerfooter.footer('./src/includes/footer.html'))
	        .pipe( handlebars(workLandingContent) )
	        .pipe( rename("index.html") )
	        .pipe( gulp.dest('build/work') )
	        .pipe(notify('workLanding built'));
        
});


gulp.task('generateHTML:howWeWorkLanding', function() {  

	    var howWeWorkLandingContent = howWeWorkLanding[0];
	
	    gulp.src('src/templates/case-study-landing.handlebars')
	        .pipe(headerfooter.header('./src/includes/header.html'))
			.pipe(headerfooter.footer('./src/includes/footer.html'))
	        .pipe( handlebars(howWeWorkLandingContent) )
	        .pipe( rename("index.html") )
	        .pipe( gulp.dest('build/work') )
	        .pipe(notify('caseStudyLanding built'));
        
});


gulp.task('generateHTML:contactLanding', function() {  

	for(var i=0; i<contact.length; i++) {
    
	    var contactContent = contact[i];
	
	    gulp.src('src/templates/index.handlebars')
	        .pipe(headerfooter.header('./src/includes/header.html'))
			.pipe(headerfooter.footer('./src/includes/footer.html'))
	        .pipe( handlebars(contactContent) )
	        .pipe( rename("index.html") )
	        .pipe( gulp.dest('build/contact') )
	        .pipe(notify('contact built'));
        
        
    }

});
*/






