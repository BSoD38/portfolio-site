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
    if($(window).scrollTop() == 0){
        $("#backtop").addClass("hidden");
    } else {
        $("#backtop").removeClass("hidden");
    }
    $.getJSON('https://json.geoiplookup.io/', function(data) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + data.city + "," + data.country_code + "&appid=989c42344ea2700f01c6e5a0819d3d61" + "&units=metric",
            success: function(res){
                $("#location-city").text(data.city);
                $("#location-country").text(data.country_name);
                $("#weather").text(res.weather[0].main);
                $("#temperature").text(res.main.temp);
                $("#weather-loading").remove();
                $("#weather-loaded").show();
            },
            error: function(xhr, status, error){
                console.log(xhr, status, error);
            }
        })
      });
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
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});

$(window).scroll(function () {
    if($(window).scrollTop() == 0){
        $("#backtop").addClass("hidden");
    } else {
        $("#backtop").removeClass("hidden");
    }
});