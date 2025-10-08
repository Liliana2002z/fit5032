<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
          @keyup.enter="searchByCity"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
    
    <main>
      <div v-if="weatherData" class="weather-data-display">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        
        <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
        
        <p class="temperature">{{ temperature }} °C</p>
        
        <span class="description">{{ weatherData.weather[0].description }}</span>
      </div>
      
      <p v-else-if="isLoading">Loading weather data...</p>
      <p v-else-if="error">{{ error }}</p>
      <p v-else>Enter a city or allow location access to see the weather.</p>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const API_KEY = "5a88e16be935249f64588d3d3b9717da";
const BASE_URL = "http://api.openweathermap.org/data/2.5";

const city = ref("");
const weatherData = ref(null);
const isLoading = ref(false);
const error = ref(null);

const temperature = computed(() => {
  return weatherData.value
    ? Math.floor(weatherData.value.main.temp - 273.15)
    : null;
});

const iconUrl = computed(() => {
  return weatherData.value
    ? `${BASE_URL}/img/w/${weatherData.value.weather[0].icon}.png`
    : null;
});

const fetchWeatherData = async (url) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(url);
    weatherData.value = response.data;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    error.value = "Could not retrieve weather data. Please check the city name.";
    weatherData.value = null;
  } finally {
    isLoading.value = false;
  }
};

const fetchCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        fetchWeatherData(url);
      },
      (geoError) => {
        console.warn('Geolocation denied or failed:', geoError);
        error.value = "Location access denied. Please enter a city name manually.";
      }
    );
  } else {
    error.value = "Geolocation not supported by this browser.";
  }
};

const searchByCity = () => {
  if (city.value.trim() === "") {
    error.value = "Please enter a city name.";
    return;
  }
  const url = `${BASE_URL}/weather?q=${city.value}&appid=${API_KEY}`;
  fetchWeatherData(url);
};

onMounted(() => {
  fetchCurrentLocationWeather();
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.header {
  margin-bottom: 30px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 20px;
}

h1 {
  color: #333;
  margin-bottom: 15px;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 60%;
  max-width: 300px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}

.weather-data-display {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h2 {
  color: #555;
  margin-bottom: 10px;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.temperature {
  font-size: 3em;
  font-weight: bold;
  color: #d9534f;
  margin: 0;
}

.description {
  display: block;
  margin-top: 5px;
  font-size: 1.2em;
  color: #777;
  text-transform: capitalize;
}
</style>