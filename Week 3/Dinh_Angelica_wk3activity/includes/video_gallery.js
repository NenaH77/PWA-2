// JavaScript Document
// Written by Chris Converse
// for lynda.com




var thumbnailPosition= 0;

function animateThumbnail(){

    if(window.thumbnailPosition < 800){
        window.thumbnailPosition += 200;//if it is not 800 this will take the current value and add 200
    }else{
        window.thumbnailPosition = 0;
    }

    var newPosition = window.thumbnailPosition * -1;//moves x-axis to the left
    $('p.debug').html(newPosition);
    $('a.videoLink.hover').css('background-position', ''+newPosition+'px 0px');
}

$(document).ready(function() {

    setInterval(animateThumbnail, 500);

    $('a.videoLink').hover(
        function(){
            var captionPosition = 85 -$(this).children('.caption').height();
            var iconPosition = captionPosition-32;
            $(this).children('.caption').animate({top:captionPosition+'px'},250);
            $(this).children('img.play').animate({top:iconPosition+'px',opacity:1},250);
            $(this).addClass('hover')
        },
       function(){
            $(this).children('.caption').animate({top:'116px'},250);
            $(this).children('img.play').animate({top:'25px',opacity:1},250);
           $(this).removeClass('hover')
        }
    );

	// Set up link thumbnails
	$('a.videoLink').each(function(){
		
		var thumbnailFilePath = 'video/' + $(this).attr('videofile') + '.jpg';
		var videoCaption = $(this).attr('videocaption');
		
		$(this).css('background-image','url('+thumbnailFilePath+')');
		$(this).html('<div class="caption">'+videoCaption+'</div><img class="play" src="images/play_icon.png" />');
	
	});
	
	$('.videoLink').click(function(){
		
		// Get attributes from link clicked
		var videoFile = $(this).attr('videofile');
		var videoPoster = $(this).attr('videofile');
		var videoWidth = Number($(this).attr('videowidth'));
		var videoHeight = Number($(this).attr('videoheight'));
		
		// Set up HTMLvideo player code with above variables
		var videoCode = '<video width="'+videoWidth+'" height="'+videoHeight+'" controls autoplay autobuffer><source src="video/'+videoFile+'.mp4" type="video/mp4" /><source src="video/'+videoFile+'.ogv" type="video/ogg" /><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+videoWidth+'" height="'+(videoHeight+40)+'" id="lynda_video_player" align="middle"><param name="allowScriptAccess" value="sameDomain"><param name="allowFullScreen" value="true"><param name="movie" value="lynda_video_player.swf?videoFile=video/'+videoFile+'.mp4&amp;skinFile=lynda_video_skin.swf&amp;videoFileWidth='+videoWidth+'&amp;videoFileHeight='+videoHeight+'"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="scale" value="noscale"><param name="salign" value="lt"><embed src="lynda_video_player.swf?videoFile=video/'+videoFile+'.mp4&amp;skinFile=lynda_video_skin.swf&amp;videoFileWidth='+videoWidth+'&amp;videoFileHeight='+videoHeight+'" quality="high" width="'+videoWidth+'" height="'+(videoHeight+40)+'" name="lynda_video_player" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" scale="noscale" salign="lt" wmode="transparent" allowfullscreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object></video>';
		
		// Set inline HTML content
		$('#videoPlayer').html(videoCode);
		
		// Load new inline HTML code in lightbox
		$.fancybox({
			'transitionIn' : 'fade',
			'transitionOut' : 'fade',
			'href' : '#videoPlayer'
		});
		
		// Add onclick to video tag for Android
		var myNavigator = navigator.userAgent.toLowerCase();
		var testForAndroid = myNavigator.indexOf("android") > -1;
		if(testForAndroid) {
			$('#videoPlayer source[type*="video/mp4"]').removeAttr('type');
			$('#videoPlayer video').attr('onclick','this.play();')
		}
	
	});

});