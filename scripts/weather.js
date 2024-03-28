document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '5456abcd3c96c6b5d54fed653469bfa1';
    const city = 'Johannesburg';

    // Initial fetch and update
    fetchWeatherData();

    // Set interval to fetch and update weather data every 10 minutes (600,000 milliseconds)
    const intervalId = setInterval(() => {
        fetchWeatherData();
    }, 600000);

    function fetchWeatherData() {
        const timestamp = new Date().getTime(); // Add a timestamp to prevent caching
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&dt=${timestamp}`;

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
        const temperatureKelvin = data.main.temp;
        const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
        const description = capitalizeEachWord(data.weather[0].description);
        const iconCode = data.weather[0].icon;

        document.getElementById('temperature').textContent = temperatureCelsius + ' °C';
        document.getElementById('description').textContent = description;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${iconCode}.png`;
    }

    // Function to capitalize the first letter of each word in a string
    function capitalizeEachWord(string) {
        return string.replace(/\b\w/g, c => c.toUpperCase());
    }
});

