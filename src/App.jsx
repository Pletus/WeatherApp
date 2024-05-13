import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // input field part
  const [search, setSearch] = useState("Warsaw");
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
      <div className="flex card-container shadow-lg lg:w-1/2 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col lg:flex-row justify-between leading-normal">
        <input
          type="text"
          onChange={handleInputChange}
          value={search}
          className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Insert your City"
        />
        <button
          onSubmit={onSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
          {/* <img
            src="src\assets\icons\search-svgrepo-com.svg"
            className="search-btn"
            alt="Search City Button"
          /> */}
        </button>
      </div>
      {/* {loading ? <p>Loading...</p> : error ? <p>Error:</p> : <div></div>} */}
      {weatherData ? (
        <>
          <h2 className="border-2 border-indigo-300 little-card rounded-2xl p-4 flex flex-col gap-6 drop-shadow-lg">
            {weatherData.city.name}
          </h2>
          <p className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            Temperature: {weatherData.list[0].main.temp}°C
          </p>
          <p className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            Description: {weatherData.list[0].weather[0].description}
          </p>
          <p className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            Feels like : {weatherData.list[0].main.feels_like}°C
          </p>
          <p className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            Humidity : {weatherData.list[0].main.humidity}%
          </p>
          <p className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            Pressure : {weatherData.list[0].main.pressure}
          </p>
          <p className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            Wind Speed : {weatherData.list[0].wind.speed}m/s
          </p>

          {/* <div>
            <div className="border-2 border-indigo-300 little-card rounded-2xl p-4 flex flex-col gap-6 drop-shadow-lg">
              <h3>Date</h3>
              <img
                className="little-card-imgs"
                src="src\assets\imgs\sun.png"
                alt=""
              />
              <h3>36</h3>
              <h3>humidity</h3>
            </div>
          </div> */}

          {/* {weatherData.list.slice(1, 6).map((day, index) => (
  <div key={day.objectID}>
    <li key={day.objectID}>
      <div>
        <p>{index + 1}.</p>
        <p>Temperature: {weatherData.list.main.temp}°C</p>
          <p>Description: {weatherData.list.weather[0].description}</p>
          <p>Feels like : {weatherData.list.main.feels_like}°C</p>
          <p>Humidity : {weatherData.list.main.humidity}%</p>
          <p>Pressure : {weatherData.list.main.pressure}</p>
          <p>Wind Speed : {weatherData.list.wind.speed}m/s</p>
        
        </h3>
      </div>
    </li>
  </div>
))} */}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
}

export default App;
