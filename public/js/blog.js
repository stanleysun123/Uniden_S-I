
$(document).ready(function(){
    $("tr").on({
        mouseenter: function(){
            $(this).css("background-color", "yellow");
        },  
        mouseleave: function(){
            $(this).css("background-color", "White");
        }, 
        click: function(){
            $(this).css("background-color", "Blue");
        }  
    });
});
