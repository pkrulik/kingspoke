function inputMailTo(){$("a.email-link").each(function(){var e=$(this),a=e.attr("data-name").split("").reverse().join(""),i=e.attr("data-department");e.attr("href","mailto:"+a+"@kingspoke.co?subject=KINGSPOKE "+i)})}function playVideo(e,a,i,t){i.hasClass("paused")&&(t.play(),i.removeClass("paused").addClass("playing"),a.removeClass("play").addClass("pause"),i.parent().addClass("child-playing"),$(".sidebar").removeClass("half-width").addClass("full-width")),t.addEventListener("timeupdate",function(){updateScrubberBar(),t.currentTime>=t.duration&&(pauseVideo(e,a,i,t),t.currentTime=0,scrubberBar.value=0)})}function pauseVideo(e,a,i,t){i.hasClass("playing")&&(t.pause(),i.removeClass("playing").addClass("paused"),a.removeClass("pause").addClass("play"),$(".sidebar").removeClass("full-width").addClass("half-width"))}function updateScrubberBar(){var e=thisVideoObject.currentTime/thisVideoObject.duration*100;$(scrubberBar).children("span").css("left",e+"%")}function updateVideoTime(e,a,i,t){}function showControls(){$(".video-controls").removeClass("invisible").addClass("visible"),$(".video-details").removeClass("invisible").addClass("visible"),controlsVisible=!0}function hideControls(){$(".video-controls").addClass("invisible").removeClass("visible"),$(".video-details").addClass("invisible").removeClass("visible"),controlsVisible=!1}function executeJS(){sr.reveal(".scroll-reveal",{duration:500,distance:"50px",scale:1,easing:"cubic-bezier(0.39, 0.575, 0.565, 1)",delay:200,origin:"bottom"});var e=null;$(".slider").slider(),inputMailTo(),$(window).width()>600?($(".video-controls").click(function(e){var a=$(this).data("id");playPause=$(this).children(".play-pause"),thisVideo=$("video[data-id='"+a+"']"),thisVideoObject=thisVideo.get(0),scrubberBar=$(this).children(".scrubber-bar").get(0),isPlaying=thisVideoObject.currentTime>0&&!thisVideoObject.paused&&!thisVideoObject.ended&&thisVideoObject.readyState>2,$(e.target).hasClass("play")&&!isPlaying?($(".playing").length&&($(".playing").get(0).pause(),$(".playing").removeClass("playing").addClass("paused"),$(".pause").removeClass("pause").addClass("play")),playVideo(a,playPause,thisVideo,thisVideoObject)):$(e.target).hasClass("pause")&&isPlaying?pauseVideo(a,playPause,thisVideo,thisVideoObject):$(e.target).hasClass("full-screen")?thisVideoObject.requestFullscreen?thisVideoObject.requestFullscreen():thisVideoObject.mozRequestFullScreen?thisVideoObject.mozRequestFullScreen():thisVideoObject.webkitRequestFullscreen&&thisVideoObject.webkitRequestFullscreen():$(e.target).hasClass("scrubber-bar")&&(offset=$(scrubberBar).offset(),left=e.pageX-offset.left,totalWidth=$(scrubberBar).width(),percentage=left/totalWidth,videoTime=thisVideoObject.duration*percentage,thisVideoObject.currentTime=videoTime)}),$(".video-wrapper").mousemove(function(){clearTimeout(e),showControls(),e=setTimeout(function(){hideControls()},1e3)})):$(".video-controls").click(function(e){var a=$(this).data("id");playPause=$(this).children(".play-pause"),thisVideo=$("video[data-id='"+a+"']"),thisVideoObject=thisVideo.get(0),scrubberBar=$(this).children(".scrubber-bar").get(0),isPlaying=thisVideoObject.currentTime>0&&!thisVideoObject.paused&&!thisVideoObject.ended&&thisVideoObject.readyState>2,thisVideoObject.play()})}window.sr=ScrollReveal(),function(e){e.fn.slider=function(){return this.each(function(){var a=e(this),i=a.find(".controls button"),t=0,s=a.find(".active-wrapper ul").clone(),n=a.find(".active-wrapper ul li");e(n.get().reverse()).each(function(){(t+=1)<=9?e(this).attr("data-number","0"+t):e(this).attr("data-number",t)}),a.find(".active-wrapper").after('<div class = "next-wrapper image-wrapper"></div>'),a.find(".next-wrapper").html(s),a.find(".next-wrapper ul li").last().remove(),a.find(".active-wrapper ul li").first().addClass("last"),a.find(".active-wrapper ul li").last().addClass("first active"),a.find(".next-wrapper ul li").first().addClass("next-last"),a.find(".next-wrapper ul li").last().addClass("next-first next-active");var r=a.find(".active-wrapper ul li.last").attr("data-number");a.find("span.last-number").html(r),i.click(function(){var i=a.find(".slider-wrapper .active-wrapper li.active"),t=e(i).next(),s=e(i).prev(),n=e(s).attr("data-number"),r=e(t).attr("data-number"),d=a.find("span.active-number"),l=a.find(".slider-wrapper .next-wrapper li.next-active"),o=a.find(".slider-wrapper .next-wrapper li.next-last");nextPrevious=e(l).next(),nextNext=e(l).prev(),e(this).hasClass("next")?e(i).hasClass("last")||(e(i).addClass("previous").removeClass("active"),e(s).addClass("active").removeClass("next"),e(l).addClass("next-previous").removeClass("next-active"),e(nextNext).addClass("next-active").removeClass("next-next"),d.html(n)):e(this).hasClass("back")&&(e(i).hasClass("first")||(e(i).addClass("next").removeClass("active"),e(t).addClass("active").removeClass("previous"),e(l).addClass("next-next").removeClass("next-active"),e(nextPrevious).addClass("next-active").removeClass("next-previous"),d.html(r),e(i).hasClass("last")&&o.addClass("next-active").removeClass("next-previous")))})})}}(jQuery),jQuery(document).ready(function(e){function a(e,a){s=!0,$("body").addClass("page-is-changing"),$(".loader").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){$(".loader").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"),i(e,a),n=e}),t()||(i(e,a),n=e)}function i(e,a){e=""==e?"index.html":e;var i=$("<div id = "+n+'"></div>');if(e.indexOf("index.html")<0)var n=e.replace("../","").replace("/",""),r=e+"index.html #"+n;else var n=e.replace("/index.html","").replace("../",""),r=e+" #"+n;$("#ajax-wrapper").load(r,function(n){sr.sync(),window.scroll(0,0);var r=t()?400:0;setTimeout(function(){i.hasClass("cd-about")?$("body").addClass("cd-about"):$("body").removeClass("cd-about"),$("body").removeClass("page-is-changing"),executeJS(),$(".loader").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){s=!1,$(".loader").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend")}),t()||(s=!1)},r),e!=window.location&&a&&window.history.pushState({path:e},"",e)})}function t(){return $("html").hasClass("csstransitions")}executeJS();var s=!1,n="";firstLoad=!1,$(window).scroll(function(){$(".header-image").css("opacity",1-$(window).scrollTop()/550),$(".header-image img").css("top",0-$(window).scrollTop()/2+"px")}),$("body").on("click",'[data-type="page-transition"]',function(e){e.preventDefault();var i=$(this).attr("href");s||a(i,!0),firstLoad=!0}),$(window).on("popstate",function(){if(firstLoad){var e=location.pathname.split("/"),i="../"+e[e.length-2]+"/"+e[e.length-1];s||n==i||a(i,!1)}firstLoad=!0})});