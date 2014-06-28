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

    /* ============= Logout ======================================= */

    $('#logOut').click(function(e){
        e.preventDefault;
        $.get('xhr/logout.php', function(){
            window.location.assign('welcome.html');
        })
    });

    /* ============= Display User ======================= */

    $.getJSON("xhr/check_login.php", function(data){
        $.each(data, function(key, val){
            console.log(val.first_name);
            $('.userid').html('Welcome User:' + val.first_name);//first_name format is in the database
        })
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

    /* ============= Go to Project Button ======================= */

    $('.projectsbtn').on('click', function(e){
        e.preventDefault();
        window.location.assign('project.html');
    });

    /* ============= Go to Add Button ======================= */

    $('.addButton').on('click', function(e){
        e.preventDefault();
        window.location.assign('add.html');
    });

    /* ============= Go to Admin Button ======================= */

    $('.admin').on('click', function(e){
        e.preventDefault();
        window.location.assign('admin.html');
    });

    /* ============= Buttons ======================================= */

    $("input[type=submit], [type=button], .tabs a, button")
        .button()
        .click(function(e){
            e.preventDefault();
        });

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

    /* ============= Add Modal ======================================= */

    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            /*.fadeOut();*/
            .fadeIn();
    });

    $('.close').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeOut();
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
                             //'<div style="border:1px solid black">' +
                             '<div id="sortable" class="ui-state-default"> <span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
                             "<input class='projectid' type='hidden' value='" +result.id + "'>"+//hiding projectid. pulling result.id from database
                             "Project Name: " + result.projectName + "<br>" + //cancatenate project name with result.projectName which is also being pulled by the database
                             "Project Description: " + result.projectDescription + "<br>" +
                             "Project Status: " + result.status + "<br>"

                             + '<button class="deletebtn">Delete</button>'
                             + '<button class="modalClick2" class="editbtn">Edit</button>'
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

    /* ============= Fading Options for Modal ======================= */

     $('.mystatus').mouseover(function() {
         $(this).fadeTo(100, .3);
     });

     $('.mystatus').mouseout(function(){
         $(this).fadeTo(100, 1);
     });

     /* ============= Sortable ======================================= */

     $( "#sortable" ).sortable();
     $( "#sortable" ).disableSelection();

     /* ============= Date Picker ======================================= */

     $(".mydatepicker").datepicker();

    /* ============= Plugin Modal ======================================= */

    jQuery(function ($) {
        var contact = {
            message: null,
            init: function () {
                $('#contact-form input.contact, #contact-form a.contact').click(function (e) {
                    e.preventDefault();

                    // load the contact form using ajax
                    $.get("data/contact.php", function(data){
                        // create a modal dialog with the data
                        $(data).modal({
                            closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
                            position: ["15%",],
                            overlayId: 'contact-overlay',
                            containerId: 'contact-container',
                            onOpen: contact.open,
                            onShow: contact.show,
                            onClose: contact.close
                        });
                    });
                });
            },
            open: function (dialog) {
                // dynamically determine height
                var h = 280;
                if ($('#contact-subject').length) {
                    h += 26;
                }
                if ($('#contact-cc').length) {
                    h += 22;
                }

                var title = $('#contact-container .contact-title').html();
                $('#contact-container .contact-title').html('Loading...');
                dialog.overlay.fadeIn(200, function () {
                    dialog.container.fadeIn(200, function () {
                        dialog.data.fadeIn(200, function () {
                            $('#contact-container .contact-content').animate({
                                height: h
                            }, function () {
                                $('#contact-container .contact-title').html(title);
                                $('#contact-container form').fadeIn(200, function () {
                                    $('#contact-container #contact-name').focus();

                                    $('#contact-container .contact-cc').click(function () {
                                        var cc = $('#contact-container #contact-cc');
                                        cc.is(':checked') ? cc.attr('checked', '') : cc.attr('checked', 'checked');
                                    });
                                });
                            });
                        });
                    });
                });
            },
            show: function (dialog) {
                $('#contact-container .contact-send').click(function (e) {
                    e.preventDefault();
                    // validate form
                    if (contact.validate()) {
                        var msg = $('#contact-container .contact-message');
                        msg.fadeOut(function () {
                            msg.removeClass('contact-error').empty();
                        });
                        $('#contact-container .contact-title').html('Sending...');
                        $('#contact-container form').fadeOut(200);
                        $('#contact-container .contact-content').animate({
                            height: '80px'
                        }, function () {
                            $('#contact-container .contact-loading').fadeIn(200, function () {
                                $.ajax({
                                    url: 'data/contact.php',
                                    data: $('#contact-container form').serialize() + '&action=send',
                                    type: 'post',
                                    cache: false,
                                    dataType: 'html',
                                    success: function (data) {
                                        $('#contact-container .contact-loading').fadeOut(200, function () {
                                            $('#contact-container .contact-title').html('Thank you!');
                                            msg.html(data).fadeIn(200);
                                        });
                                    },
                                    error: contact.error
                                });
                            });
                        });
                    }
                    else {
                        if ($('#contact-container .contact-message:visible').length > 0) {
                            var msg = $('#contact-container .contact-message div');
                            msg.fadeOut(200, function () {
                                msg.empty();
                                contact.showError();
                                msg.fadeIn(200);
                            });
                        }
                        else {
                            $('#contact-container .contact-message').animate({
                                height: '30px'
                            }, contact.showError);
                        }

                    }
                });
            },
            close: function (dialog) {
                $('#contact-container .contact-message').fadeOut();
                $('#contact-container .contact-title').html('Goodbye...');
                $('#contact-container form').fadeOut(200);
                $('#contact-container .contact-content').animate({
                    height: 40
                }, function () {
                    dialog.data.fadeOut(200, function () {
                        dialog.container.fadeOut(200, function () {
                            dialog.overlay.fadeOut(200, function () {
                                $.modal.close();
                            });
                        });
                    });
                });
            },
            error: function (xhr) {
                alert(xhr.statusText);
            },
            validate: function () {
                contact.message = '';
                if (!$('#contact-container #contact-name').val()) {
                    contact.message += 'Name is required. ';
                }

                var email = $('#contact-container #contact-email').val();
                if (!email) {
                    contact.message += 'Email is required. ';
                }
                else {
                    if (!contact.validateEmail(email)) {
                        contact.message += 'Email is invalid. ';
                    }
                }

                if (!$('#contact-container #contact-message').val()) {
                    contact.message += 'Message is required.';
                }

                if (contact.message.length > 0) {
                    return false;
                }
                else {
                    return true;
                }
            },
            validateEmail: function (email) {
                var at = email.lastIndexOf("@");

                // Make sure the at (@) sybmol exists and
                // it is not the first or last character
                if (at < 1 || (at + 1) === email.length)
                    return false;

                // Make sure there aren't multiple periods together
                if (/(\.{2,})/.test(email))
                    return false;

                // Break up the local and domain portions
                var local = email.substring(0, at);
                var domain = email.substring(at + 1);

                // Check lengths
                if (local.length < 1 || local.length > 64 || domain.length < 4 || domain.length > 255)
                    return false;

                // Make sure local and domain don't start with or end with a period
                if (/(^\.|\.$)/.test(local) || /(^\.|\.$)/.test(domain))
                    return false;

                // Check for quoted-string addresses
                // Since almost anything is allowed in a quoted-string address,
                // we're just going to let them go through
                if (!/^"(.+)"$/.test(local)) {
                    // It's a dot-string address...check for valid characters
                    if (!/^[-a-zA-Z0-9!#$%*\/?|^{}`~&'+=_\.]*$/.test(local))
                        return false;
                }

                // Make sure domain contains only valid characters and at least one period
                if (!/^[-a-zA-Z0-9\.]*$/.test(domain) || domain.indexOf(".") === -1)
                    return false;

                return true;
            },
            showError: function () {
                $('#contact-container .contact-message')
                    .html($('<div class="contact-error"></div>').append(contact.message))
                    .fadeIn(200);
            }
        };

        contact.init();

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




