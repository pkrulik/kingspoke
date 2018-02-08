jQuery(document).ready(function(event){
	
	var isAnimating = false,
	    newLocation = '';
	    firstLoad = false;
  
  
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
	    
	    
	    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
	    	
	    	console.log('transition end')
	    	
	    	loadNewContent(url, bool);
			newLocation = url;
			$('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			
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
		
	  	var newSection = url.replace('/index.html', '').replace('../','');
	  	var section = $('<div id = '+newSection+'"></div>');
	  	var sectionToLoad = url + " #" + newSection
	  	
	  	console.log('url = ' + url)
	  	console.log('newSection = ' + newSection)
	  	console.log ('section = ' + section)
	  	console.log ('sectionToLoad = ' + sectionToLoad)
  		
	  	$('#ajax-wrapper').load(sectionToLoad, function(event){
	      
	      // load new content and replace <main> content with the new one
// 	      $('#ajax-wrapper').html(sectionToLoad);
	      console.log('inside load')
	      
	      //if browser doesn't support CSS transitions - dont wait for the end of transitions
	      var delay = ( transitionsSupported() ) ? 1200 : 0;
	      
	      setTimeout(function(){
	        
	        //wait for the end of the transition on the loading bar before revealing the new content
	        ( section.hasClass('cd-about') ) ? $('body').addClass('cd-about') : $('body').removeClass('cd-about');
	        $('body').removeClass('page-is-changing');
	        
	        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
	          isAnimating = false;
	          $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
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
