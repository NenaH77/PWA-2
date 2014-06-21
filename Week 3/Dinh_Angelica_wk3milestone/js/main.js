/*  
	Your Project Title: Milestone1:Project
	Author: Angelica M. Dinh
*/

(function($){


    /* ============= Login ======================================= */

    $('#signinButton').click(function(){
        var user = $('#user').val();//declared a var calling to id of user and value. whatever is the value is in the #user we're going to take that info and store it in the var user field
        var pass = $('#pass').val();
        console.log('This notifies you if the password is working');
        $.ajax({
            url:'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            },
            success:function(response){
                console.log('test user');
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html');
                };
            }
        });
    });

    /* ============= Register ======================================= */

    $('#register').on('click', function(){
        var firstname= $('#first').val(),
            lastname= $('#last').val(),
            username= $('#userName').val(),
            email= $('#email').val(),
            password = $('#password').val();
            console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);

        $.ajax({
            url:'xhr/register.php',
            type: 'post',
            dataType:'json',
            data: {
                first_name:firstname,
                last_name: lastname,
                username: username,
                email: email,
                password: password
            },
            success: function(response){
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html');
                }
            }
        });

    });

    /* ============= New Projects ======================================= */

    $('#addButton').on('click', function(e){
        e.preventDefault();
        var projName = $('#projectName').val(),
        projDesc = $('#projectDescription').val(),
        projDue = $('#projectDueDate').val(),
        status = $('input[name = "status"]:checked').prop('id');

        $.ajax({
            url: 'xhr/new_project.php',
            type: 'post',
            dataType: 'json',
            data: {
             //   ID name |  Var name
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status
            },
            success: function(response){
                console.log('test for success');

                if(response.error){
                alert(response.error);
            }else{
                window.location.assign("project.html");
            };

        }
    });
});

    /* ============= Get Projects ======================================= */

    var projects = function(){
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',//using get bcuz we're on server side
            dataType: 'json',
            success:function(response){
                 if(response.error){//if not working correctly, this is our error msg
                     console.log(response.error);
                 }else{
                     for(var i= 0, j=response.projects.length; i<j; i++){//if working correctly, use for loop
                         var result = response.projects[i];

                         $('.projects').append(//pulling projects by id of 'class' and appending(adding css) tags below
                             '<div style="border:1px solid black">' +
                             "<input class='projectid' type='hidden' value='" +result.id + "'>"+//hiding projectid. pulling result.id from database
                             "Project Name: " + result.projectName + "<br>" + //cancatenate project name with result.projectName which is also being pulled by the database
                             "Project Description: " + result.projectDescription + "<br>" +
                             "Project Status: " + result.status + "<br>"

                             + '<button class="deletebtn">Delete</button>'
                             + '<button class="editbtn">Edit</button>'
                             +'</div><br>'
                         );
                     };

                        $('.deletebtn').on('click', function(e){
                         var pid = $(this).parent().find('.projectid').val();
                            console.log('test delete');
                            $.ajax({
                                url: 'xhr/delete_project.php',
                                data: {
                                    projectID: pid
                                },
                                type:'POST',
                                dataType:'json',
                                success: function(response){
                                    console.log('Testing for success');

                                    if(response.error){
                                        alert(response.error);
                                    }else{
                                        console.log(result.id);
                                        window.location.assign('project.html');
                                };
                            }
                        });
                     });//end delete

                     $('.editbtn').on('click', function(e){
                         e.preventDefault();
                         window.location.assign('edit.html');
                     });//end edit
                 }
            }
        })
    }
projects();//close var projects

    /* ============= Go to Project Page ======================= */

    $('.projectsbtn').on('click', function(e){
        e.preventDefault();
        window.location.assign('project.html');
    });

    /* ============= Go to Add Page ======================= */

    $('.addButton').on('click', function(e){
        e.preventDefault();
        window.location.assign('add.html');
    });

    /* ============= Go to Admin Page ======================= */

    $('.admin').on('click', function(e){
        e.preventDefault();
        window.location.assign('admin.html');
    });

    /* ============= Display User ======================= */

    $.getJSON("xhr/check_login.php", function(data){
        $.each(data, function(key, val){
            console.log(val.first_name);
            $('.userid').html('Welcome User:' + val.first_name);//first_name format is in the database
        })
    });

    /* ============= Add Modal ======================================= */

    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#backgroundOverlay')
            .fadeIn()
            .find('#modalBox')
        /*.fadeOut();*/
            .fadeIn();
    });

    $('.close').on('click', function(event){
        event.preventDefault();
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

    /* ============= toolTip for Register/Welcome/Modal Page ====================================== */

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
        }).mousemove(function(e){
            var mousex = e.pageX + 20;//get X coordinates
            var mousey = e.pageY + 10;//get y coordinates
            $('.tooltip').css({ top: mousey, left: mousex })
        });

    /* ============= Accordion in Admin Page ====================================== */

    $('ul.tabs').each(function(){
        var $active, $content, $links = $(this).find('a');

        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');

        $content =$($active[0].hash);

        $links.not($active).each(function(){
            $(this.hash).hide();
        });

        $(this).on('click', 'a', function(e){
            $active.removeClass('active');
            $content.hide();

            $active = $(this);
            $content = $(this.hash);

            $active.addClass('active');
            $content.show();

            e.preventDefault();
        });
    });

    /* ============= Logout ======================================= */

    $('#logOut').click(function(e){
        e.preventDefault;
        $.get('xhr/logout.php', function(){
            window.location.assign('welcome.html');
        })
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




