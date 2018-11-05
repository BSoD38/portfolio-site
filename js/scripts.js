function switchTheme(element) {
    if (element.hasClass("light")) {
        element.removeClass("light");
        element.addClass("dark");
        document.title = "Good evening!";
        document.cookie = "night";
    } else {
        element.removeClass("dark");
        element.addClass("light");
        document.title = "Good day!";
        document.cookie = "day";
    }
}

function switchStrings(id, elements, lang)
{
    switch(lang){
        case "en":
            elements.each(function () {
                if(!$(this).hasClass("fas") || !$(this).hasClass("not-text") || !$(this).hasClass("fab")){
                    if($(this).attr("class") !== undefined){
                        let classes = $(this).attr("class").split(' ');
                        if(classes.length === 1){
                            $(this).text(en[id][$(this).attr("class")]);
                        } else {
                            console.log($(this).attr("id"));
                            if (classes.indexOf("menus") > -1) {
                                $(this).text(en.menus[id]);
                            }
                        }
                    }
                }
            });
            break;
        case "fr":
            elements.each(function () {
                if(!$(this).hasClass("fas") || !$(this).hasClass("not-text") || !$(this).hasClass("fab")) {
                    if($(this).attr("class") !== undefined){
                        let classes = $(this).attr("class").split(' ');
                        if (classes.length === 1) {
                            $(this).text(fr[id][$(this).attr("class")]);
                        } else {
                            if (classes.indexOf("menus") > -1) {
                                $(this).text(fr.menus[id]);
                            }
                        }
                    }
                }
            });
            break;
        default:
            changeLanguage("en");
            break;
    }

}

function changeLanguage(lang){
     switchStrings("intro", $("#intro").find("*"), lang);
     switchStrings("personal", $("#personal").find("*"), lang);
     switchStrings("qualifications", $("#qualifications").find("*"), lang);
     switchStrings("experience", $("#experience").find("*"), lang);
     switchStrings("projects", $("#projects").find("*"), lang);
     switchStrings("weather", $("#weather").find("*"), lang);
     switchStrings("switch-text", $("#switch-text"), lang);
     switchStrings("back-top", $("#back-top"), lang);
     switchStrings("change-lang", $("#change-lang"), lang);
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
                    $("#weather-data").text(res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.substr(1));
                    $("#temperature").text(res.main.temp);
                    $("#weather-loading").remove();
                    $("#weather-loaded").show();
                },
                error: function (xhr, status, error) {
                    console.log(xhr, status, error);
                }
            })
        });
        if(document.cookie === "night")
        {
            switchTheme($("#box"));
            switchTheme($("#picture"));
            switchTheme($("body"));
            let icon = $("#switch-icon");
            $("#switch-text").text(" Light mode");
            icon.removeClass("fa-moon");
            icon.addClass("fa-sun");
            $(".btn").each(function () {
                switchTheme($(this));
            });
        } else if (document.cookie.length === 0) {
            let hour = new Date().getHours();
            if(hour >= 18 || hour <= 5){
                switchTheme($("#box"));
                switchTheme($("#picture"));
                switchTheme($("body"));
                let icon = $("#switch-icon");
                $("#switch-text").text(" Light mode");
                icon.removeClass("fa-moon");
                icon.addClass("fa-sun");
                $(".btn").each(function () {
                    switchTheme($(this));
                });
            }
        }
    }
);

$("#switch-mode").on("click" ,function () {
    switchTheme($("#box"));
    switchTheme($("#picture"));
    switchTheme($("body"));

    $(".btn").each(function () {
        switchTheme($(this));
    });

    let icon = $("#switch-icon");

    if ($("#switch-mode").hasClass("light")) {
        $("#switch-text").text(" Dark mode");
        icon.removeClass("fa-sun");
        icon.addClass("fa-moon");
    } else {
        $("#switch-text").text(" Light mode");
        icon.removeClass("fa-moon");
        icon.addClass("fa-sun");
    }
});

$("#back-top").on("click", function () {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});

$("#change-lang").on("click", function () {
    if($(this).hasClass("en")){
        changeLanguage("fr");
        $(this).removeClass("en");
        $(this).addClass("fr");
    } else if ($(this).hasClass("fr")) {
        changeLanguage("en");
        $(this).removeClass("fr");
        $(this).addClass("en");
    }
});

$(window).on("scroll" ,function () {
    if ($(window).scrollTop() === 0) {
        $("#back-top").addClass("hidden");
    } else {
        $("#back-top").removeClass("hidden");
    }
});