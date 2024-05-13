import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // input field part
  const [search, setSearch] = useState("Berlin");
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  // fetch elements
  const [location, setLocation] = useState([]);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // first we fetch the lat & lon with the GeoCodingAPI
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${
            import.meta.env.VITE_OPENWEATHERMAP_API_KEY
          }`
        );
        // {import.meta.env.VITE_OPENWEATHERMAP_API_KEY} this is written in the .env file in the main directory of the project like this:
        // VITE_OPENWEATHERMAP_API_KEY=d9f0ef7dd56e7819e22250d866d5094c
        // setLocation(response.data[0]);
        setLat(response.data[0].lat.toFixed(2));
        setLon(response.data[0].lon.toFixed(2));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchLocationData();
  }, [search]);

  console.log(lat);
  console.log(lon);

  // now we input the lat&lon into the new fetch request
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
            import.meta.env.VITE_OPENWEATHERMAP_API_KEY
          }`
        );
        // {import.meta.env.VITE_OPENWEATHERMAP_API_KEY}
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [lat]);

  if (!location) return <p>Loading...</p>;

  console.log(weatherData);

  return (
    <>
      <div className="flex gap-4 mt-20">
        <input
          type="text"
          onChange={handleInputChange}
          value={search}
          className="rounded-s-sm text-center drop-shadow-2xl border"
          placeholder="Insert your City"
        />
        <button onSubmit={onSubmit} className="rounded-s-sm drop-shadow-2xl">
          <img
            src="src\assets\icons\search-svgrepo-com.svg"
            className="search-btn"
            alt="Search City Button"
          />
        </button>
      </div>
      {/* {loading ? <p>Loading...</p> : error ? <p>Error:</p> : <div></div>} */}
      {weatherData ? (
        <>
          {/* <p>{weatherData.list[0].weather[0].description}</p> */}
          <h2>{weatherData.city.name}</h2>
          <p>Temperature: {weatherData.list[0].main.temp}°C</p>
          <p>Description: {weatherData.list[0].weather[0].description}</p>
          <p>Feels like : {weatherData.list[0].main.feels_like}°C</p>
          <p>Humidity : {weatherData.list[0].main.humidity}%</p>
          <p>Pressure : {weatherData.list[0].main.pressure}</p>
          <p>Wind Speed : {weatherData.list[0].wind.speed}m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
}

export default App;
