$(document).ready(function(){


    $("#ikebukuro").customTogglePanel({
        speed: 400
    });

    $("#nakano").customTogglePanel({
        speed: 400
    });

    $("#chiba").customTogglePanel({
        speed: 400
    });

    // event card dropdown 
    $(".event-btn").click(function(e){
        $(this).closest(".card-footer").find(".dropdown").toggleClass("active");
    });

    $(".tab-btn").click(function() {
        // Remove 'active' class from all tab contents
        $(this).closest(".tabs").find(".tab-content").removeClass("active");
        $(this).closest(".tabs").find(".tab-list").find(".tab-btn").removeClass("active");

        // Add 'active' class to the corresponding tab content
        var targetContent = $(this).data("target");
        $("#" + targetContent).addClass("active");
        $(this).addClass("active")
    });

    
    $(".faq-style-text").bounceOnView({
        duration: "0.8s",
        delay: 0.08,
        easing: "ease-out"
    });


});