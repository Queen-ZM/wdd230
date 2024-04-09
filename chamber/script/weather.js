document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '5456abcd3c96c6b5d54fed653469bfa1';
    const city = 'Johannesburg';
  
    // Initial fetch and update
    fetchWeatherData();
  
    //fetch and update weather data every 10 minutes (600,000 milliseconds)
    const intervalId = setInterval(() => {
        fetchWeatherData();
    }, 600000);
  
    function fetchWeatherData() {
        const timestamp = new Date().getTime(); // Add a timestamp to prevent caching
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&dt=${timestamp}`;
  
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data); // Log the response for debugging
                updateWeatherCard(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
  
    function updateWeatherCard(data) {
        // Update current weather
        const currentTemperatureKelvin = data.list[0].main.temp;
        const currentTemperatureCelsius = Math.round(currentTemperatureKelvin - 273.15);
        const currentDescription = capitalizeEachWord(data.list[0].weather[0].description);
        const currentIconCode = data.list[0].weather[0].icon;
  
        document.getElementById('current-temperature').textContent = currentTemperatureCelsius + ' °C';
        document.getElementById('current-description').textContent = currentDescription;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${currentIconCode}.png`;
  
        // Update 3-day forecast
        const forecastList = document.getElementById('forecast-list');
        forecastList.innerHTML = ''; // Clear previous forecast items
  
        const threeDayForecast = data.list.filter((forecast, index) => index % 8 === 0).slice(1, 4);
  
        threeDayForecast.forEach(dayForecast => {
            const averageTemperature = Math.round(dayForecast.main.temp - 273.15);
            const dayName = getDayName(dayForecast.dt_txt);
            const dayDescription = capitalizeEachWord(dayForecast.weather[0].description);
            const dayIconCode = dayForecast.weather[0].icon;
            const rainChance = calculateRainChance(dayForecast);
  
            const forecastItem = document.createElement('li');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <p>${dayName}: ${averageTemperature} °C, ${dayDescription}, Rain: ${rainChance}%</p>
                <img src="https://openweathermap.org/img/w/${dayIconCode}.png" alt="Forecast Icon">
            `;
            forecastList.appendChild(forecastItem);
        });
    }
  
    function calculateRainChance(dayForecast) {
        return dayForecast.rain ? Math.round(dayForecast.rain['3h']) : 0;
    }
  
    function getDayName(dateString) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayName = days[date.getDay()];
        return dayName;
    }
  
    // Function to capitalize the first letter of each word in a string
    function capitalizeEachWord(string) {
        return string.replace(/\b\w/g, c => c.toUpperCase());
    }
  });