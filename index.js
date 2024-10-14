document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const location = document.getElementById('location').value;
    const loadingDiv = document.getElementById('loading');
    const weatherInfoDiv = document.getElementById('weather-info');
    
    loadingDiv.classList.remove('hidden');
    weatherInfoDiv.classList.add('hidden');
    
    // Получение данных о погоде по местоположению
    getWeather(location)
        .then(weatherData => {
            console.log(weatherData);
            const processedData = processWeatherData(weatherData);
            displayWeather(processedData);
        })
        .catch(error => {
            console.error('Ошибка получения данных:', error);
            weatherInfoDiv.innerHTML = '<p>Ошибка получения данных. Попробуйте еще раз.</p>';
            weatherInfoDiv.classList.remove('hidden');
        })
        .finally(() => {
            loadingDiv.classList.add('hidden');
        });
});

// Функция для обращения к API
async function getWeather(location) {
    const apiKey = 'b91b136aed2c41e883d81730241410'; // Ваш API-ключ от WeatherAPI
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=ru`);
    
    if (!response.ok) {
        throw new Error('Не удалось получить данные о погоде');
    }
    
    return await response.json();
}

// Функция для обработки данных из API
function processWeatherData(data) {
    return {
        location: data.location.name,
        temperature: data.current.temp_c, // Температура в Цельсиях
        description: data.current.condition.text, // Описание погоды
        humidity: data.current.humidity, // Влажность
        windSpeed: data.current.wind_kph // Скорость ветра в км/ч
    };
}

// Функция для отображения данных на странице
function displayWeather(weather) {
    const weatherInfoDiv = document.getElementById('weather-info');
    
    weatherInfoDiv.innerHTML = `
        <h2>Погода в ${weather.location}</h2>
        <p>Температура: ${weather.temperature}°C</p>
        <p>Описание: ${weather.description}</p>
        <p>Влажность: ${weather.humidity}%</p>
        <p>Скорость ветра: ${weather.windSpeed} км/ч</p>
    `;
    
    weatherInfoDiv.classList.remove('hidden');
}

