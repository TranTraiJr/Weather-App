import { useEffect, useState } from "react";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
// `${BASE_URL}=${location}&units=metric&APPID=ee2ed134d8cc95403c2035464c196f6b`
function App() {
  const [data, setData] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("Hanoi");
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessga] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLocation(searchInput);
  }

  useEffect(
    function () {
      async function searchCity() {
        if (!location) return;
        setIsLoading(true);
        try {
          const response = await fetch(
            `${BASE_URL}${location}&units=metric&APPID=ee2ed134d8cc95403c2035464c196f6b`
          );
          const data = await response.json();
          if (response.ok) {
            setData(data);
          } else {
            setErrorMessga(data.message);
          }
        } catch (error) {
          setErrorMessga(error.message);
        }
        setIsLoading(false);
      }
      searchCity();
    },
    [location]
  );

  return (
    <div className="app">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search City"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button>Search</button>
        </form>
      </div>
      <div className="container">
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <div className="top">
            {errorMessage ? (
              <div>{errorMessage}</div>
            ) : (
              <>
                <div className="location">
                  <p>{data.name}</p>
                </div>
                <div className="temp">
                  {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                </div>
                <div className="description">
                  {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
              </>
            )}
          </div>
        )}
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="bold">{data.wind.speed.toFixed()} MPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
