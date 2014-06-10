/**
 * Created by NenaH77 on 6/10/14.
 */

$(document).ready(function(){

    $('.faq_question').click(function(){

        if ($(this).parent().is('.open')){//testing to see if the parent of the question we clicked on has a class assigned a class to it called 'open'
            $(this).closest('.faq').find('.faq_answer_container').animate({'height': '0'}, 500);//1st part of closing our answer.
            $(this).closest('.faq').find('.letter_a').fadeOut(500);//when closing 'a' fades out & 'q' moves over
            $(this).closest('.faq').find('.letter_q').animate({'left':'25px'});
            $(this).closest('.faq').removeClass('open');//closes the addClass if you click to close it
        }else{
            /*in the else statement we are calculating a variable called new height based on how much content is in the
            faq answer, and then we're goin to add the open class on to the outermost container*/
            var newHeight= $(this).closest('.faq').find('.faq_answer').height() + 'px';//we are finding the nearest faq answer inside of the element that we clicked on, & we're adding px to the value so we can use it as a CSS property
            $(this).closest('.faq').find('.faq_answer_container').animate({'height': newHeight}, 500);
            $(this).closest('.faq').find('.letter_a').fadeIn(500);
            $(this).closest('.faq').find('.letter_q').animate({'left':'10px'});
            $(this).closest('.faq').addClass('open');
        }
    });

    $('.faq').each(function(){
        $(this).append('<div class="letter_q"></div> <div class="letter_a"></div>');//adding Q&A letter content inside of each item question
    });

    findAnchorLink();
});

function findAnchorLink(){
    if(location.href.indexOf('#') != -1){
        var namedAnchor = window.location.hash;
        var faqToFind = namedAnchor + ' .faq_question';
        $(faqToFind).trigger('click');
    }
}