function inputMailTo(){console.log("inputMailTo"),$("a.email-link").each(function(){var e=$(this),s=e.attr("data-name").split("").reverse().join(""),i=e.attr("data-department");console.log(),e.attr("href","mailto:"+s+"@kingspoke.co?subject=KINGSPOKE "+i)})}function playVideo(e,s,i,a){i.hasClass("paused")&&(a.play(),i.removeClass("paused").addClass("playing"),s.removeClass("play").addClass("pause"),i.parent().addClass("child-playing"),$(".sidebar").removeClass("half-width").addClass("full-width"),console.log("play video")),a.addEventListener("timeupdate",function(){updateScrubberBar(),a.currentTime>=a.duration&&(console.log("resetVideo"),pauseVideo(e,s,i,a),a.currentTime=0,scrubberBar.value=0)})}function pauseVideo(e,s,i,a){i.hasClass("playing")&&(a.pause(),i.removeClass("playing").addClass("paused"),s.removeClass("pause").addClass("play"),$(".sidebar").removeClass("full-width").addClass("half-width"),console.log("pauseVideo"))}function updateScrubberBar(){console.log("updateScrubberBar");var e=thisVideoObject.currentTime/thisVideoObject.duration*100;$(scrubberBar).children("span").css("left",e+"%")}function updateVideoTime(e,s,i,a){console.log("udpateVideoTime")}function showControls(){$(".video-controls").removeClass("invisible").addClass("visible"),$(".video-details").removeClass("invisible").addClass("visible"),controlsVisible=!0}function hideControls(){console.log("hideControls"),$(".video-controls").addClass("invisible").removeClass("visible"),$(".video-details").addClass("invisible").removeClass("visible"),controlsVisible=!1}function executeJS(){console.log("executeJS"),sr.reveal(".scroll-reveal",{duration:500,distance:"50px",scale:1,easing:"cubic-bezier(0.39, 0.575, 0.565, 1)",delay:200,origin:"bottom"});var e=null;$(".slider").slider(),inputMailTo(),$(window).width()>600?(console.log("windowwidth > 600"),$(".video-controls").click(function(e){var s=$(this).data("id");playPause=$(this).children(".play-pause"),thisVideo=$("video[data-id='"+s+"']"),thisVideoObject=thisVideo.get(0),scrubberBar=$(this).children(".scrubber-bar").get(0),isPlaying=thisVideoObject.currentTime>0&&!thisVideoObject.paused&&!thisVideoObject.ended&&thisVideoObject.readyState>2,$(e.target).hasClass("play")&&!isPlaying?($(".playing").length&&($(".playing").get(0).pause(),$(".playing").removeClass("playing").addClass("paused"),$(".pause").removeClass("pause").addClass("play")),playVideo(s,playPause,thisVideo,thisVideoObject)):$(e.target).hasClass("pause")&&isPlaying?pauseVideo(s,playPause,thisVideo,thisVideoObject):$(e.target).hasClass("full-screen")?thisVideoObject.requestFullscreen?thisVideoObject.requestFullscreen():thisVideoObject.mozRequestFullScreen?thisVideoObject.mozRequestFullScreen():thisVideoObject.webkitRequestFullscreen&&thisVideoObject.webkitRequestFullscreen():$(e.target).hasClass("scrubber-bar")&&(console.log("scrubber-bar clicked"),offset=$(scrubberBar).offset(),left=e.pageX-offset.left,totalWidth=$(scrubberBar).width(),percentage=left/totalWidth,videoTime=thisVideoObject.duration*percentage,thisVideoObject.currentTime=videoTime,console.log($(this)))}),$(".video-wrapper").mousemove(function(){clearTimeout(e),showControls(),e=setTimeout(function(){hideControls()},1e3)})):$(".video-controls").click(function(e){var s=$(this).data("id");playPause=$(this).children(".play-pause"),thisVideo=$("video[data-id='"+s+"']"),thisVideoObject=thisVideo.get(0),scrubberBar=$(this).children(".scrubber-bar").get(0),isPlaying=thisVideoObject.currentTime>0&&!thisVideoObject.paused&&!thisVideoObject.ended&&thisVideoObject.readyState>2,thisVideoObject.play()})}window.sr=ScrollReveal(),function(e){e.fn.slider=function(){return this.each(function(){var s=e(this),i=s.find(".controls button"),a=0;console.log(s);var t=s.find(".active-wrapper ul").clone(),o=s.find(".active-wrapper ul li");e(o.get().reverse()).each(function(){(a+=1)<=9?e(this).attr("data-number","0"+a):e(this).attr("data-number",a)}),s.find(".active-wrapper").after('<div class = "next-wrapper image-wrapper"></div>'),s.find(".next-wrapper").html(t),s.find(".next-wrapper ul li").last().remove(),s.find(".active-wrapper ul li").first().addClass("last"),s.find(".active-wrapper ul li").last().addClass("first active"),s.find(".next-wrapper ul li").first().addClass("next-last"),s.find(".next-wrapper ul li").last().addClass("next-first next-active");var n=s.find(".active-wrapper ul li.last").attr("data-number");console.log(n),s.find("span.last-number").html(n),i.click(function(){var i=s.find(".slider-wrapper .active-wrapper li.active"),a=e(i).next(),t=e(i).prev(),o=e(t).attr("data-number"),n=e(a).attr("data-number"),l=s.find("span.active-number"),r=s.find(".slider-wrapper .next-wrapper li.next-active"),d=s.find(".slider-wrapper .next-wrapper li.next-last");nextPrevious=e(r).next(),nextNext=e(r).prev(),e(this).hasClass("next")?(console.log("click next"),e(i).hasClass("last")||(e(i).addClass("previous").removeClass("active"),e(t).addClass("active").removeClass("next"),e(r).addClass("next-previous").removeClass("next-active"),e(nextNext).addClass("next-active").removeClass("next-next"),l.html(o),console.log(o))):e(this).hasClass("back")&&(console.log("clicked back"),e(i).hasClass("first")||(e(i).addClass("next").removeClass("active"),e(a).addClass("active").removeClass("previous"),e(r).addClass("next-next").removeClass("next-active"),e(nextPrevious).addClass("next-active").removeClass("next-previous"),l.html(n),console.log(o),e(i).hasClass("last")&&d.addClass("next-active").removeClass("next-previous")))})})}}(jQuery),jQuery(document).ready(function(e){function s(e,s){t=!0,$("body").addClass("page-is-changing"),$(".loader").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){$(".loader").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"),console.log("transition end"),i(e,s),o=e}),a()||(i(e,s),o=e)}function i(e,s){console.log("loadnewcontent");var i=(e=""==e?"index.html":e).replace("/index.html","").replace("../",""),o=$("<div id = "+i+'"></div>');if("../index/"==e){n="../index/index.html #index";console.log("HOMEPAGE")}else var n=e+" #"+i;console.log("url = "+e),console.log("newSection = "+i),console.log("section = "+o),console.log("sectionToLoad = "+n),$("#ajax-wrapper").load(n,function(i){console.log(".load"),sr.sync(),window.scroll(0,0);var n=a()?1200:0;setTimeout(function(){o.hasClass("cd-about")?$("body").addClass("cd-about"):$("body").removeClass("cd-about"),$("body").removeClass("page-is-changing"),executeJS(),$(".loader").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){t=!1,$(".loader").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend")}),a()||(t=!1)},n),e!=window.location&&s&&(console.log("add the new page to the window.history"),window.history.pushState({path:e},"",e))})}function a(){return $("html").hasClass("csstransitions")}executeJS();var t=!1,o="";firstLoad=!1,$(window).scroll(function(){$(".header-image").css("opacity",1-$(window).scrollTop()/550),$(".header-image img").css("top",0-$(window).scrollTop()/2+"px")}),$("body").on("click",'[data-type="page-transition"]',function(e){e.preventDefault();var i=$(this).attr("href");console.log("newPage "+i),t||s(i,!0),firstLoad=!0,console.log("clicked"+i)}),$(window).on("popstate",function(){if(firstLoad){var e=location.pathname.split("/"),i="../"+e[e.length-2]+"/"+e[e.length-1];console.log("newPageArray "+e),console.log("newPage "+i),t||o==i||s(i,!1)}firstLoad=!0})});