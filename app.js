$(document).ready(function () {
  var api_key = "a40d75f246e598410934cfe215184077";
  var userInput = "";

  $("#searchBtn").on("click", function (e) {
    e.preventDefault();
    userInput = $("#userInput").val();
    var userText = $("#userInput").val();
    localStorage.setItem("data", JSON.stringify({ task: userText }));
    // renderData();

    // console.log("i have been clicked");

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${api_key}`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      console.log(res.city.coord);
      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&exclude=minutely,hourly&appid=${api_key}`,
        dataType: "json",
      }).then(function (res) {
        console.log(res);
        var uvdisplay = res.current.uvi;
        $("#uvindex").text(`Uv Index: ${uvdisplay}`);

        for (let i = 0; i < 5; i++) {
          res.daily[i];
          console.log(res.daily[i]);

          var hum = res.daily[i].humidity;
          var temp = res.daily[i].temp.day;
          $("#fiveDay").append(
            `<div class'dailyForecast'>
          <h6>Humidity:${hum}%<br>Temperature: ${temp}K</br> </h6>
          </div>`
          );
          // $("#fiveDay").append(
          //   `<div class"dailyForecast"> <h6>Temp: ${temp} </h6></div>`
          // );
          console.log(res.daily[i].temp.day);

          // $("#fiveDay").append(`<div class'dailyForecast'>
          // <h5>Day ${i + 1}</h5>
          // </div>`);
        }
        //do everything you need to make the 5 day forecast
      });
      // console.log(res);
      // console.log(res.city.name);
      // console.log(res.list[0].main.temp);
      // console.log(res.list[0].main.humidity);
      // console.log(res.list[0].wind.speed);
      // console.log("miss uvindex");
      renderInfo(
        res.city.name,
        res.list[0].main.temp,
        res.list[0].main.humidity,
        res.list[0].wind.speed
      );
    });
  });
});

function renderInfo(str1, str2, str3, str4) {
  $("#name").html(str1);
  $("#temperature").html("Temperature: " + str2);
  $("#humidity").html("Humidity: " + str3);
  $("#windspeed").html("Wind Speed: " + str4);
  // $("#uvindex").text(str5);
}

// function renderData() {
//   var item = JSON.parse(localStorage.getItem("data"));
//   console.log(item);
//   $("#pastSearches").val(item.task);
//   $("#pastSearches").append(`<div class="pastSearchDiv">${item.task}</div>`);
// }

// $(".pastSearchDiv").on("click", function (event) {
//   event.preventDefault();
//   let searchTerm = this.innerHTML;
//   $.ajax({
//     type: "GET",
//     url: `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${api_key}`,
//     dataType: "json",
//   }).then(function (res) {
//     console.log(res);
//     console.log(res.city.coord);
//     $.ajax({
//       type: "GET",
//       url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&exclude=minutely,hourly&appid=${api_key}`,
//       dataType: "json",
//     }).then(function (res) {
//       console.log(res);

//       for (let i = 0; i < 5; i++) {
//         res.daily[i];
//         $("#fiveDay").append(`<div class'dailyForecast'>
//         <h5>Day ${i + 1}</h5>
//         </div>`);
//       }
//       //do everything you need to make the 5 day forecast
//     });
//     // console.log(res);
//     // console.log(res.city.name);
//     // console.log(res.list[0].main.temp);
//     // console.log(res.list[0].main.humidity);
//     // console.log(res.list[0].wind.speed);
//     // console.log("miss uvindex");
//     renderInfo(
//       res.city.name,
//       res.list[0].main.temp,
//       res.list[0].main.humidity,
//       res.list[0].wind.speed
//     );
//   });
// });

//   //check for local storage  to send them to the DOM
// });
// // on click button when user search for a city

//to do list
//1) console log the localstorage and figure out why it isn't saving between sessions
//2) fill out the daily forecast divs with information, and style them using CSS
//3) get the uv and the windspeed? whatever you're missing on the main search
//4) put an AJAX call in the on click event for the new buttons that we created with the past searches.
