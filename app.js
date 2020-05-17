$(document).ready(function () {
  var userInput = "";

  var cityArray = JSON.parse(window.localStorage.getItem("cityArray")) || [];
  for (var i = 0; i < cityArray.length; i++) {
    $("#pastSearches").prepend(`<li class="prevCity">${cityArray[i]}</li>`);
  }

  $("#searchBtn").on("click", function (e) {
    e.preventDefault();
    userInput = $("#userInput").val();
    //var userText = $("#userInput").val();
    cityArray.push(userInput);

    $("#pastSearches").prepend(`<li class="prevCity">${userInput}</li>`);

    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    // renderData();
    doAjax(userInput);
    // console.log("i have been clicked");
  });

  $("#pastSearches").on("click", "li", function () {
    var oldValue = $(this).text();
    doAjax(oldValue);
  });
});

function doAjax(cityInput) {
  var api_key = "a40d75f246e598410934cfe215184077";
  var cityName = "";
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${api_key}&units=imperial `,
    dataType: "json",
  }).then(function (res) {
    console.log(res);
    cityName = res.city.name;
    // console.log(res.city.coord);
    //*
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&exclude=minutely,hourly&appid=${api_key}&units=imperial`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      var uvdisplay = res.current.uvi;
      $("#uvindex").text(`Uv Index: ${uvdisplay}`);

      renderInfo(
        cityName,
        res.current.temp,
        res.current.humidity,
        res.current.wind_speed
      );

      for (let i = 1; i < 6; i++) {
        res.daily[i];
        console.log(res.daily[i]);

        var hum = res.daily[i].humidity;
        var temp = res.daily[i].temp.day;
        var datetime = new Date(res.daily[i].dt);
        var icon = res.daily[i].weather[0].icon;

        $("#fiveDay").append(
          `<div class'dailyForecast'>
          <h6>Day: ${datetime}</h6>
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
        <h6>Humidity:${hum}%<br>Temperature: ${temp}K</br> </h6>
        </div>`
        );
      }
    });
  });
}

function renderInfo(str1, str2, str3, str4) {
  $("#name").html(str1);
  $("#temperature").html("Temperature: " + str2);
  $("#humidity").html("Humidity: " + str3);
  $("#windspeed").html("Wind Speed: " + str4);
}
