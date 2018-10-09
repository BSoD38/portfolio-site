function switchTheme(element){
    if(element.hasClass("light")){
        element.removeClass("light");
        element.addClass("dark");
    } else {
        element.removeClass("dark");
        element.addClass("light");
    }
}

$(function(){
    if($(window).scrollTop()== 0){
        $("#backtop").hide();
    } else {
        $("#backtop").show();
    }
}
);

$("#switchmode").click(function (e) {
    switchTheme($("#box"));
    switchTheme($("#picture"));
    switchTheme($("body"));

    $(".btn").each(function () {
        switchTheme($(this));
    });

    if($("#switchmode").hasClass("light")){
        $("#switchtext").text(" Dark mode");
        $("#switchicon").removeClass("fa-sun");
        $("#switchicon").addClass("fa-moon");
    } else {
        $("#switchtext").text(" Light mode");
        $("#switchicon").removeClass("fa-moon");
        $("#switchicon").addClass("fa-sun");
    }
});

$("#backtop").click(function(e){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

$(window).scroll(function () {
    if($(window).scrollTop()== 0){
        $("#backtop").hide();
    } else {
        $("#backtop").show();
    }
});