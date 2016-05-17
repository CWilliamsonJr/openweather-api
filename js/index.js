$(document).ready(function() { // runs when the page is loaded
  navigator.geolocation.getCurrentPosition(GetGeoLocation);
  $(".table_div").addClass("col-xs-2 col-sm-2 col-md-2 col-lg-2 ");
  $(".table").addClass("table-bordered table-condensed");
  $(".table").hover(function(){
    BackgroundWeatherImage($(this).find(".condition").text());
});




}); // End of Page Load

function GetWeather(weatherApi) {
  let requestObj = { // Ajax request
    url: weatherApi,
    type: "Get",
    success: DisplayWeather,
    dataType: 'json', // data type of the retrived file

  };
  $.ajax(requestObj);
}

function DisplayWeather(weather) { // Displays the layout
  let datesArr = ParseDate(weather);
  let forcastDays = 5;
  let day = "";
  let celTempHi;
  let celTempLow;

   $("#city_name").html(weather.city.name).addClass("h2");
  for (i = 0; i < forcastDays; i++) {
    day = "#day" + i;
    celTempHi = Math.round((weather.list[i].temp.max -32) * .5556);
    celTempLow = Math.round((weather.list[i].temp.min -32) * .5556);
    $(day).text(datesArr[i]); //date
    $(day + "_temp").html("<b>Hi:</b> " + weather.list[i].temp.max +" (" + celTempHi +")<b> / Lo:</b> " + weather.list[i].temp.min +" ("+celTempLow+")"); // High and Low temp
    $(day + "_description").html("<b>Expected Outlook:</b> " + weather.list[i].weather[0].description); // Expected Outlook
    $(day + "_humidity").html("<b>Humidity:</b> " + weather.list[i].humidity); // Humidty
    $(day + "_windspeed").html("<b>Windspeed:</b> " + weather.list[i].speed); // Windspeed
    $(day + "_icon").attr("src", "http://openweathermap.org/img/w/" + weather.list[i].weather[0].icon + ".png"); //Icons
    $(day + "_main").html(weather.list[i].weather[0].main); //Main weather description.
  }
  BackgroundWeatherImage(weather.list[0].weather[0].main);
}

function ParseDate(weather) { // converts UTC into a reconizable date.
  let forcastDays = 5;
  let weatherDay = new Date();
  let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let dayArr = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let datesArr = []; /// Array to hold the dates.

  for (i = 0; i < forcastDays; i++) {
    weatherDay.setTime(weather.list[i].dt * 1000); // converts UTC time to milliseconds

    datesArr.push(dayArr[weatherDay.getDay()] + " " + monthArr[weatherDay.getMonth()] + " " + weatherDay.getDate());
  }
  return datesArr;
}

function GetGeoLocation(position) { // gets the location of the user
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  let weatherApi = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&units=imperial&cnt=5&appid=466b75eb50a47c58f2f5fce6c437e39b";
  GetWeather(weatherApi);
}

function BackgroundWeatherImage(condition){
  let bgImg = {  // Object thats holds the background Images for different conditions
    "Clear":"http://d3c6pm2g2o4vya.cloudfront.net/weather/clear.jpg",
    "Snow":"http://d3c6pm2g2o4vya.cloudfront.net/weather/Snow.jpg",
    "Rain":"http://d3c6pm2g2o4vya.cloudfront.net/weather/Rain.jpg",
    "Drizzle":"http://d3c6pm2g2o4vya.cloudfront.net/weather/Rain.jpg",
    "Thunderstorm": "http://d3c6pm2g2o4vya.cloudfront.net/weather/Thunderstorm.jpg",
    "Clouds": "http://d3c6pm2g2o4vya.cloudfront.net/weather/Cloud.jpg"
  };
   $("body").css("background","url("+bgImg[condition]+ ")");

}
