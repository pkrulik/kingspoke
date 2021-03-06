		window.sr = ScrollReveal();

	///////////////////////////////////////////////////
	/// IMAGE SLIDER PLUGIN ///////////////////////////////
	///////////////////////////////////////////////////
		
	// PLUGIN - $('.slider').slider();
	(function ( $ ) {
	 
		$.fn.slider = function() {
			
			return this.each(function() {
				
				var slider = $(this);
				var sliderControls = slider.find('.controls button')
				var i = 0;
				console.log(slider)
				
				var images = slider.find('.active-wrapper ul').clone();
				
				// number each of the images
				var imageList = slider.find('.active-wrapper ul li')
				$(imageList.get().reverse()).each(function(){
					
					i = i+1;
					
					if ( i <= 9) {
						$(this).attr('data-number', '0' + i)
					} else {
						$(this).attr('data-number', i)
					}
					
				});
								
				// create a new wrapper for the slider off to the right called "next-wrapper
				slider.find('.active-wrapper').after('<div class = "next-wrapper image-wrapper"></div>')
				
				// duplicate our images into the "next-wrapper"
				slider.find('.next-wrapper').html(images)
				
				// the first image should be removed since the next container should show the image that's coming up next
				slider.find('.next-wrapper ul li').last().remove();
				
				slider.find('.active-wrapper ul li').first().addClass('last');
				slider.find('.active-wrapper ul li').last().addClass('first active');
				slider.find('.next-wrapper ul li').first().addClass('next-last');
				slider.find('.next-wrapper ul li').last().addClass('next-first next-active');
				
				
				var lastItem = slider.find('.active-wrapper ul li.last');
				var lastNumber = lastItem.attr('data-number')
				
				console.log(lastNumber)
				
				slider.find('span.last-number').html(lastNumber)
				
				
				sliderControls.click(function(){
									
						
					var active = slider.find('.slider-wrapper .active-wrapper li.active'),
						previous = $(active).next(),
						next = $(active).prev(),
						nextNumber = $(next).attr('data-number'),
						prevNumber = $(previous).attr('data-number'),
						activeNumberWrapper = slider.find('span.active-number'),
						nextActive = slider.find('.slider-wrapper .next-wrapper li.next-active'),
						nextLast = slider.find('.slider-wrapper .next-wrapper li.next-last')
						nextPrevious = $(nextActive).next(),
						nextNext = $(nextActive).prev();
						
						
					
										
						
					// CLICK NEXT	
					if ( $(this).hasClass('next') ) {
						
						console.log('click next')
						
						// only allow next to be clicked as many times as there are objects	
						if ( !$(active).hasClass('last') ) {
							
							// slide the active object up
							$(active).addClass('previous').removeClass('active');
							$(next).addClass('active').removeClass('next')
							
							$(nextActive).addClass('next-previous').removeClass('next-active');
							$(nextNext).addClass('next-active').removeClass('next-next')
							
							activeNumberWrapper.html(nextNumber)
						
							console.log(nextNumber)
							
						} 
						
					} 
					
					// CLICK BACK
					else if ( $(this).hasClass('back') )	{
						
						console.log ('clicked back')
						
						// only allow next to be clicked as many times as there are objects	
						if ( !$(active).hasClass('first') ) {
							
							// slide the previous object down
							$(active).addClass('next').removeClass('active');
							$(previous).addClass('active').removeClass('previous')
							
							$(nextActive).addClass('next-next').removeClass('next-active');
							$(nextPrevious).addClass('next-active').removeClass('next-previous')
							
							activeNumberWrapper.html(prevNumber)
						
							console.log(nextNumber)
							
							
							// make the last next-wrapper item show
							if ($(active).hasClass('last')) {
								
								nextLast.addClass('next-active').removeClass('next-previous')
								
							}
							
							
						}
										
					}
			
				});
			
			});
			
			
			
			
			
		}
	}( jQuery ));
	
	///////////////////////////////////////////////////
	/// END IMAGE SLIDER PLUGIN ///////////////////////////////
	///////////////////////////////////////////////////
	

	


	function inputMailTo() {
		
		
		console.log('inputMailTo')
		
		$('a.email-link').each(function() {
			
			var thisObject = $(this);
			var emailAddress = thisObject.attr('data-name').split('').reverse().join('');
			var department = thisObject.attr('data-department');
			
			console.log ()
			
			thisObject.attr('href', "mailto:" + emailAddress + "@kingspoke.co?subject=KINGSPOKE " +  department)
			
		})
		
		
	}



	function playVideo(id, playPause, thisVideo, thisVideoObject) {
				
		if (thisVideo.hasClass('paused')) {
			
			thisVideoObject.play();
			thisVideo.removeClass('paused').addClass('playing');
			playPause.removeClass('play').addClass('pause');
			
			thisVideo.parent().addClass('child-playing')

			$('.sidebar').removeClass('half-width').addClass('full-width')
			
			console.log('play video');
			
		}
				
		
		// Update the seek bar as the video plays
		thisVideoObject.addEventListener("timeupdate", function(){
			
			updateScrubberBar ();
			
		  if (thisVideoObject.currentTime >= thisVideoObject.duration) {
		  
			 console.log('resetVideo');
		
			pauseVideo(id, playPause, thisVideo, thisVideoObject);
			thisVideoObject.currentTime = 0;
			scrubberBar.value = 0;
			
			}
			
		});
		
		
		
		
		
		
	}
	
	function pauseVideo(id, playPause, thisVideo, thisVideoObject) {
		
		
		if (thisVideo.hasClass('playing')) {
			
			thisVideoObject.pause();
			thisVideo.removeClass('playing').addClass('paused');
			playPause.removeClass('pause').addClass('play');
			
			$('.sidebar').removeClass('full-width').addClass('half-width')

			console.log('pauseVideo');
			
		}
		
	}
	
	
	function updateScrubberBar () {
		
		console.log('updateScrubberBar')
		
	  // Calculate the slider value
	  var value = (thisVideoObject.currentTime / thisVideoObject.duration) * 100;
	  // Update the slider value
	  $(scrubberBar).children('span').css('left', value + "%");
	  
		
	}
	
	function updateVideoTime(id, playPause, thisVideo, thisVideoObject) {
		
	  console.log('udpateVideoTime');
	  
/*
	  // Calculate the new time
	  var time = Math.floor(thisVideoObject.duration * (scrubberBar.value / 100));
	
	  // Update the video time
	  thisVideoObject.currentTime = time;
	  
	  console.log('new video time = ' + time)
*/

	  
// 	  playVideo(id, playPause, thisVideo, thisVideoObject)
		
	}
	
	function showControls() {
		
// 		console.log('showControls')	
		$('.video-controls').removeClass('invisible').addClass('visible');
		$('.video-details').removeClass('invisible').addClass('visible');
		controlsVisible = true;

	}
	
	
	function hideControls() {
		
		console.log('hideControls')	
		$('.video-controls').addClass('invisible').removeClass('visible');
		$('.video-details').addClass('invisible').removeClass('visible');
		controlsVisible = false;
		
	}
	
	function executeJS() {
		
		console.log('executeJS')
		
		
		
		
		sr.reveal('.scroll-reveal', { duration: 500, distance:'50px', scale: 1, easing: 'cubic-bezier(0.39, 0.575, 0.565, 1)', delay: 200, origin:'bottom'});
		var hoverTimer = null;
		var i = 0;
		
		// call the slider on anything with the class of "slider"
		$('.slider').slider();
		
		// replace the mailtos
		inputMailTo();
		
		///////////////////////////////////////////////////
		/// VIDEO CONTROLS ///////////////////////////////
		///////////////////////////////////////////////////
		if ( $(window).width() > 600 ) {
		
			console.log('windowwidth > 600')
		
			$('.video-controls').click(function(e){
				
				var id = $(this).data('id');
					playPause = $(this).children('.play-pause'); // should be playPause
					thisVideo = $("video[data-id='" + id +"']"); 
					thisVideoObject = thisVideo.get(0);
					scrubberBar = $(this).children('.scrubber-bar').get(0);
					isPlaying = thisVideoObject.currentTime > 0 && !thisVideoObject.paused && !thisVideoObject.ended && thisVideoObject.readyState > 2; // check if true or false
				
				// click play button
				// if we clicked on the play button and  the video is not playing 
				if ( $(e.target).hasClass('play') && !isPlaying ) {
								
					// if another video is already playing pause it
					if ( $('.playing').length ) {
						
						$('.playing').get(0).pause();
						$('.playing').removeClass('playing').addClass('paused');
						$('.pause').removeClass('pause').addClass('play');
						
					}
					
					playVideo(id, playPause, thisVideo, thisVideoObject);
							
				} 
				
				// click pause button
				// if the paused button is clicked and the video is playing then pause the video
				else if ($(e.target).hasClass('pause') && isPlaying) {
					
					pauseVideo(id, playPause, thisVideo, thisVideoObject);
					
				}
				
				// click full screen button
				else if ( $(e.target).hasClass('full-screen') ) {
					
					  if (thisVideoObject.requestFullscreen) {
						  
					    thisVideoObject.requestFullscreen();
					    
					  } 
					  
					  else if (thisVideoObject.mozRequestFullScreen) {
						  
					    thisVideoObject.mozRequestFullScreen(); // Firefox
					    
					  } else if (thisVideoObject.webkitRequestFullscreen) {
						  
					    thisVideoObject.webkitRequestFullscreen(); // Chrome and Safari
					    
					  }
				}	
				
				
				
				
				// click scrubber bar
				else if ( $(e.target).hasClass('scrubber-bar') ) {
					
					console.log('scrubber-bar clicked')
					
					offset = $(scrubberBar).offset();
				    left = (e.pageX - offset.left);
				    totalWidth = $(scrubberBar).width(); //910
					percentage = left / totalWidth
					videoTime = thisVideoObject.duration * percentage
					
					thisVideoObject.currentTime = videoTime;
					
					console.log($(this))
					
				}
				
			});
			
			
			
			
			
			
			$(".video-wrapper").mousemove(function(){
		// 				console.log('move')
				clearTimeout(hoverTimer)
				showControls();
				hoverTimer = setTimeout( function () {hideControls()}, 1000 )
			});
		
		
		
		
			
			
		} else {
			
			$('.video-controls').click(function(e){
				
				var id = $(this).data('id');
					playPause = $(this).children('.play-pause'); // should be playPause
					thisVideo = $("video[data-id='" + id +"']"); 
					thisVideoObject = thisVideo.get(0);
					scrubberBar = $(this).children('.scrubber-bar').get(0);
					isPlaying = thisVideoObject.currentTime > 0 && !thisVideoObject.paused && !thisVideoObject.ended && thisVideoObject.readyState > 2; // check if true or false
				
					
		// 					playVideo(id, playPause, thisVideo, thisVideoObject);
					thisVideoObject.play();
							
			}); 
			
			
		} 
				
		///////////////////////////////////////////////////
		/// END VIDEO CONTROLS ///////////////////////////////
		///////////////////////////////////////////////////
		
		
		
		
		
	}// end executeJS
	
	
	
	
	
	
	
	
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
	// onload function
/*
	window.onload = function() {
		executeJS();
	}
*/
			
			
			
	///////////////////////////////////////////////////
	/// PAGE TRANSITION ///////////////////////////////
	///////////////////////////////////////////////////
jQuery(document).ready(function(event){
	
	executeJS();
	
	var isAnimating = false,
	    newLocation = '';
	    firstLoad = false;
	    
	    
	$(window).scroll(function(){		

		
	    $(".header-image").css("opacity", 1 - $(window).scrollTop() / 550);
	    $(".header-image img").css("top", 0 - $(window).scrollTop() / 2 + "px")

	  });  
  
	//trigger smooth transition from the actual page to the new one 
	$('body').on('click', '[data-type="page-transition"]', function(event){
				
		event.preventDefault();
		 
		//detect which page has been selected
		// ../work/index.html
		var newPage = $(this).attr('href');
		console.log('newPage ' + newPage)
		
		//if the page is not already being animated - trigger animation
		if( !isAnimating ) changePage(newPage, true);
		firstLoad = true;
		
		console.log('clicked' + newPage)
		
	});



	//detect the 'popstate' event - e.g. user clicking the back button
	$(window).on('popstate', function() {
				
		if( firstLoad ) {
	      /*
	      Safari emits a popstate event on page load - check if firstLoad is true before animating
	      if it's false - the page has just been loaded 
	      */
	      
		  var newPageArray = location.pathname.split('/'),
		  
		  //this is the url of the page to be loaded 
		  // ../work/index.html
		  // CHECK THIS IF ISSUES WITH PAGE LOADING ON BACK BUTTON
		  newPage = "../" + newPageArray[newPageArray.length - 2] + "/" + newPageArray[newPageArray.length - 1];
  		 
  		  console.log("newPageArray " + newPageArray)
		  console.log("newPage " + newPage)
	
	      if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
	    
	    }
	    
	    firstLoad = true;
	
	});



	function changePage(url, bool) {
		
		isAnimating = true;
    
	    // trigger page animation
	    $('body').addClass('page-is-changing');
	    
	    
	    $('.loader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('.loader').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
	    	console.log('transition end')
	    	
	    	loadNewContent(url, bool);
			newLocation = url;
			
	    });
	    
	    //if browser doesn't support CSS transitions
	    if( !transitionsSupported() ) {
			loadNewContent(url, bool);
			newLocation = url;
	    }
	    
	}



	function loadNewContent(url, bool) {
		
		console.log('loadnewcontent')
		
		url = ('' == url) ? 'index.html' : url;
		
	  	var section = $('<div id = '+newSection+'"></div>');
	  	
	  	// clicking "back" to go to the homepage doesn't load the homepage content unless 
	  	// we have this if statement
	  	// inf url doesn't include /index.html then we need to add that in
	  	
	  	if (url.indexOf("index.html") < 0) {
		  	
		  	console.log('url does not have index.html')
		  	var newSection = url.replace('../','').replace('/','');;
		  	var sectionToLoad = url + "index.html #" + newSection
		  	
		  	
	  	}
	  	
	  	
	  	
/*
	  	if ( url == "../index/") {
		  	var sectionToLoad = "../index/index.html #index" 
		  	console.log ('HOMEPAGE')
	  	} else if ( url == "../error/") {
		  	var sectionToLoad = "../error/index.html #error" 
		  	console.log ('error')
	  	}
*/
	  	
	  	else {
		  	var newSection = url.replace('/index.html', '').replace('../','');
		  	var sectionToLoad = url + " #" + newSection
	  	}
	  	 
	  	
	  	
	  	console.log('url = ' + url)
	  	console.log('newSection = ' + newSection)
	  	console.log ('section = ' + section)
	  	console.log ('sectionToLoad = ' + sectionToLoad)
  		
	  	$('#ajax-wrapper').load(sectionToLoad, function(event){
	      
	      // load new content and replace <main> content with the new one
// 	      $('#ajax-wrapper').html(sectionToLoad);
	      console.log('.load')
	       sr.sync();
	       
	       var pageTitle = $('h1').html().replace(/\b[a-z]/g, function(letter) {
		   		return letter.toUpperCase();
			});;
	       
	       document.title = "KINGSPOKE - " + pageTitle;
	       
	       // since we're ajaxing we need to get the user back to the top of the page
	      window.scroll(0, 0);	      
	      //if browser doesn't support CSS transitions - dont wait for the end of transitions
	      var delay = ( transitionsSupported() ) ? 400 : 0;
	      
	      setTimeout(function(){
		      
	        
	        //wait for the end of the transition on the loading bar before revealing the new content
	        ( section.hasClass('cd-about') ) ? $('body').addClass('cd-about') : $('body').removeClass('cd-about');
	        $('body').removeClass('page-is-changing');
	        
	        executeJS();
	        
	        $('.loader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
	          isAnimating = false;
	          $('.loader').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
	        });
	
	        if( !transitionsSupported() ) isAnimating = false;
	        
	      }, delay);
	      
	      if(url!=window.location && bool){
	        //add the new page to the window.history
	        console.log('add the new page to the window.history')
	        //if the new page was triggered by a 'popstate' event, don't add it
	        window.history.pushState({path: url},'',url);
	      }
	      
		});
  	}




	function transitionsSupported() {
		
		return $('html').hasClass('csstransitions');
		console.log('transitionsSupported')
		
	}
	
});


















	
	



			
	
