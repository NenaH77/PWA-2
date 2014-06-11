/*  
	Your Project Title: Milestone1:Project
	Author: Angelica M. Dinh
*/

(function($){
	

	/* ============= Add Modal ======================================= */

    $('.modalClick').on('click', function(e){
        e.preventDefault();
        $('#backgroundOverlay')
            .fadeIn()
            .find('#modalBox')
            /*.fadeOut();*/
    });

    $('.close').on('click', function(e){
        e.preventDefault();
        $('#backgroundOverlay')
            .fadeIn()
            .find('#modalBox')
            .fadeOut();
    });

    /* ============= Fading Options for Modal ======================= */

    $('.mystatus').mouseover(function() {
        $(this).fadeTo(100, .3);
    });

    $('.mystatus').mouseout(function(){
        $(this).fadeTo(100, 1);
    });

    /* ============= toolTip ====================================== */

    $('.masterTooltip').hover(function(){
        //Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');
    }, function(){
            //Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
        }) .mousemove(function(e){
            var mousex = e.pageX + 20;//get X coordinates
            var mousey = e.pageY + 10;//get y coordinates
            $('.tooltip').css({ top: mousey, left: mousex })
        });




	/*
	===============================================
	=========================== APPLICATION GLOBALS	
	*/
	
	var win = $(window),
		body = $(document.body),
		container = $('#container'),	// the only element in index.html
		currentUser = {}
	;
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	
	win.on('submit', '#user-reg-form', function(){
		
		return false;
	});
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




