document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  let weather = {
    apiKey: "7c003d7d85a3f2949b57158f3e7a8852",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { lon, lat } = data.coord;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";

      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&&units=metric&appid=7c003d7d85a3f2949b57158f3e7a8852"
      )
        .then((response) => {
          return response.json();
        })
        .then((data_2) => {
          var d = new Date();

          d.setDate(d.getDate() + 1);

          var year = d.getFullYear();
          var month = ("0" + (d.getMonth() + 1)).slice(-2);
          var day = ("0" + d.getDate()).slice(-2);

          var nextDay = year + "-" + month + "-" + day;
          let j;
          for (let i = 0; i < 24; i++) {
            if (nextDay + " 00:00:00" == data_2.list[i].dt_txt) {
              let temp_min = data_2.list[i].main.temp;
              document.querySelector(".temp-night").innerText =
                "Night: " + temp_min + "°C";
              j = i;
            }
          }
          let temp_max = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-day").innerText =
            "Day: " + temp_max + "°C";
          let w_icon = data_2.list[j + 4].weather[0].icon;
          document.querySelector(".w-icon1").src =
            "https://openweathermap.org/img/wn/" + w_icon + ".png";
          j = j + 4;

          temp_min = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-night2").innerText =
            "Night: " + temp_min + "°C";
          j = j + 4;

          temp_max = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-day2").innerText =
            "Day: " + temp_max + "°C";
          w_icon = data_2.list[j + 4].weather[0].icon;
          document.querySelector(".w-icon2").src =
            "https://openweathermap.org/img/wn/" + w_icon + ".png";
          j = j + 4;

          temp_min = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-night3").innerText =
            "Night: " + temp_min + "°C";
          j = j + 4;

          temp_max = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-day3").innerText =
            "Day: " + temp_max + "°C";
          w_icon = data_2.list[j + 4].weather[0].icon;
          document.querySelector(".w-icon3").src =
            "https://openweathermap.org/img/wn/" + w_icon + ".png";
          j = j + 4;

          temp_min = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-night4").innerText =
            "Night: " + temp_min + "°C";
          j = j + 4;

          temp_max = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-day4").innerText =
            "Day: " + temp_max + "°C";
          w_icon = data_2.list[j + 4].weather[0].icon;
          document.querySelector(".w-icon4").src =
            "https://openweathermap.org/img/wn/" + w_icon + ".png";
          j = j + 4;

          temp_min = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-night5").innerText =
            "Night: " + temp_min + "°C";
          j = j + 4;

          temp_max = data_2.list[j + 4].main.temp;
          document.querySelector(".temp-day5").innerText =
            "Day: " + temp_max + "°C";
          w_icon = data_2.list[j + 4].weather[0].icon;
          document.querySelector(".w-icon5").src =
            "https://openweathermap.org/img/wn/" + w_icon + ".png";
        });

      loader.classList.toggle("loader-hidden");

      fetch(
        "https://api.pexels.com/v1/search?query=" + name + "&per_page=1&page=1",
        {
          headers: {
            Authorization:
              "563492ad6f9170000100000184c220c771bd45e38355c49d5de42116",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data_3) => {
          if (data_3.photos.length > 0) {
            document.body.style.backgroundImage =
              "url(" + data_3.photos[0].src.original + ")";
            document.body.style.backgroundSize = "100% 100%";
            document.querySelector(".future-forecast").style.display = "flex";
            document.querySelector(".list").style.display = "block";
            displayNames("");

            loader.classList.toggle("loader-hidden");
            let timeout = setTimeout(() => {
              if (!loader.classList.contains("loader-hidden")) {
                console.log("am scos loader-ul");
                loader.classList.add("loader-hidden");
              }
            }, 2000);
          }
        });
    },

    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
      document.querySelector(".future-forecast").style.display = "none";
    },
  };

  document
    .querySelector(".search button")
    .addEventListener("click", function () {
      weather.search();
    });

  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        document.querySelector(".list").style.display = "none";
        weather.search();
      }
    });

  function getNextDayName(currentDay, daysFromNow) {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = dayNames.indexOf(currentDay);
    const nextDayIndex = (currentDayIndex + daysFromNow) % 7;
    return dayNames[nextDayIndex];
  }

  function updateDayNames() {
    const currentDate = new Date();
    const currentDayName = currentDate.toLocaleString("en-us", {
      weekday: "long",
    });

    const forecastItems = document.querySelectorAll(".weather-forecast-item");
    forecastItems.forEach((forecastItem, index) => {
      const dayElement = forecastItem.querySelector(".day");
      dayElement.textContent = getNextDayName(currentDayName, index + 1);
    });
  }
  updateDayNames();

  window.addEventListener("load", (event) => {
    console.log({ event });
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");
  });

  let names = [
    "Barcelona",
    "Madrid",
    "Doha",
    "Kabul",
    "Timisoara",
    "Bucharest",
    "Iasi",
    "Brasov",
    "Seville",
    "Buenos Aires",
    "Berlin",
    "Moscow",
    "Prague",
    "Berna",
    "London",
    "Tokyo",
    "Budapest",
    "Rio de Janeiro",
    "New York",
    "Boston",
    "Hamburg",
    "Dubai",
    "Washington",
  ];

  let sortedNames = names.sort();
  //reference
  let input = document.getElementById("input");

  function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
      item.remove();
    });
  }

  function displayNames(value) {
    input.value = value;
    removeElements();
  }

  input.addEventListener("keyup", (e) => {
    if (input.value.length >= 3) {
      removeElements();

      for (let i of sortedNames) {
        if (
          i.toLowerCase().startsWith(input.value.toLowerCase()) &&
          input.value != ""
        ) {
          let listItem = document.createElement("li");

          listItem.classList.add("list-items");
          listItem.style.cursor = "pointer";
          listItem.addEventListener("click", function () {
            displayNames(i);
          });

          let word = "<b>" + i.substr(0, input.value.length) + "</b>";
          word += i.substr(input.value.length);
          console.log(word);

          listItem.innerHTML = word;
          document.querySelector(".list").appendChild(listItem);
        }
      }
    }
  });
});
