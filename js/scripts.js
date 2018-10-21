function switchTheme(element) {
    if (element.hasClass("light")) {
        element.removeClass("light");
        element.addClass("dark");
    } else {
        element.removeClass("dark");
        element.addClass("light");
    }
}

$(function () {
        if ($(window).scrollTop() === 0) {
            $("#back-top").addClass("hidden");
        } else {
            $("#back-top").removeClass("hidden");
        }
        $.getJSON('https://json.geoiplookup.io/', function (data) {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + data.city + "," + data.country_code + "&appid=989c42344ea2700f01c6e5a0819d3d61&units=metric",
                success: function (res) {
                    $("#location-city").text(data.city);
                    $("#location-country").text(data.country_name);
                    $("#weather").text(res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.substr(1));
                    $("#temperature").text(res.main.temp);
                    $("#weather-loading").remove();
                    $("#weather-loaded").show();
                },
                error: function (xhr, status, error) {
                    console.log(xhr, status, error);
                }
            })
        });
    }
);

$("#switch-mode").on("click" ,function () {
    switchTheme($("#box"));
    switchTheme($("#picture"));
    switchTheme($("body"));

    $(".btn").each(function () {
        switchTheme($(this));
    });

    if ($("#switch-mode").hasClass("light")) {
        $("#switch-text").text(" Dark mode");
        $("#switch-icon").removeClass("fa-sun");
        $("#switch-icon").addClass("fa-moon");
    } else {
        $("#switch-text").text(" Light mode");
        $("#switch-icon").removeClass("fa-moon");
        $("#switch-icon").addClass("fa-sun");
    }
});

$("#back-top").on("click", function () {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});

$(window).on("scroll" ,function () {
    if ($(window).scrollTop() === 0) {
        $("#back-top").addClass("hidden");
    } else {
        $("#back-top").removeClass("hidden");
    }
});