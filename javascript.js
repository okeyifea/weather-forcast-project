//Code to produce the time and date
    function updateDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // Corrected indexing
      const day = now.getDate();
      const hours = now.getHours() % 12 || 12; // 12-hour format
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const amPm = now.getHours() < 12 ? 'AM' : 'PM';
      const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month - 1]; // Corrected indexing
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
      const dateTimeElement = document.querySelector('.date-time');
        if (dateTimeElement) {
          dateTimeElement.innerHTML = `${dayOfWeek}, ${monthString} ${day}, ${year} ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${amPm}`;
        } else {
          console.log ('Element with class "date-time" not found');
        }
    }
    
  setInterval (updateDateTime, 1000);

const input = document.getElementById('input'); 

function submitInput() {
  // The code checks if the input is emptys
  if (input.value.trim() === '') {
    alert('Please enter a correct state');
    return false;
  } else {
    // The code stores the input and redirects to another page
    localStorage.setItem('input', input.value);
    window.location.href = "index2.html";
  }
}

  //Code to extract data from API
const apikey = "8f12c103c592e4216ded1bcc4da97cb1"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

  async function checkWeather(){
    const input = localStorage.getItem('input');
      if (!input) {
        console.error("No input found in localStorage");
        return;
      }
      
   try {
    const response = await fetch(apiUrl + input + ",NG&appid=" + apikey);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
    var data = await response.json();
    console.log(data)

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "KMPH";

    const WeatherIcon = document.querySelector(".img1")
    if (data.weather[0].main == "Clouds") {
      WeatherIcon.src = "./IMG/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      WeatherIcon.src = "./IMG/sun.png";
    } else{
      WeatherIcon.src = "./IMG/rain.png";
    }
  }catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
  // Ensure the DOM is fully loaded before calling checkWeather
  window.addEventListener('load', () => {
    const input = localStorage.getItem('input');
    const displayElement = document.querySelector('.state');
    if (displayElement) {
      displayElement.innerHTML = `${input}`;
    }else{
      console.log("Error")
    }

    checkWeather()
  });
