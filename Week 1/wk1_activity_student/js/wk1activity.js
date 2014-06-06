// JavaScript Document

(function($){  //10. Explain why this is used instead of a document ready function. Comment your answer out on line 4.
<!--Sometmes you might have more than 1 javascript library loaded such as prototype and therefore may use this example -->

//4. Add the jQuery function-select the h2 of this simple web page.
$("document").ready(function(){
    //$("h2").css("color","red");
    //$("h2:not(h2:eq(1))").css("border", "12px solid pink");
    //$("h2:contains('S')").css("color","red");
    //$("li:parent").css("color","red");
    //$("ul:has(li[class=hlistingEurope])").css("color","red");
    //$("ul li:nth-child(2)").css("color","red");
    //$("ul li:nth-child(2n)").css("color","red");
    //$("ul li:last-child").css("color","red");
    $("h2").html();

//5. Selectors using IDS
    //$("ul#hlisting").css("border", "2px solid blue");
    //$("#hlisting:first").css("border", "2px solid blue");
    $("#hlisting").html();

//6. Selectors using Classes
   $("li.hlistingAmerica h2").css("border", "5px solid orange");
   //$("li.hlistingAmerica h2:lt(1)").css("border", "5px solid orange");
    //$("li[class=hlistingAmerica]").css("border", "5px solid orange");
    //$("button[class^=b]").css("border", "5px solid orange");
    //$("li[class=hlistingAmerica] [h2]").css("border", "5px solid orange"); ****Did not work***Must only work with id/classes & not tags

//7. Manipulator
    /*var msg = $("<span class='phone'>1-555-Tibbles</span>");
        $(".details:first").html(msg.html());*/
    $("#container h1:first").text("1-555-Tibbles");

//8. Manipulator-Before
    $(".buy:last").before("<span class='phone'>1-555-Tibbles</span>");

//9. CSS Method - Complete this line
 $(".trip").on("mouseenter", function() {
    $(this).css("background-color", "#252b30");
  });


});
})(jQuery) //Closes main tag