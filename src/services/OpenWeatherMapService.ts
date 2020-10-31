import axios from 'axios';
import { gunzipSync } from 'zlib';
import HistoryCityDto from '../types/dto/open-weather-api/HistoryCityDto';
import City from '../models/City';
import WeatherFeatcherParams from '../types/utility/WeatherFeatcherParams';
import HistoryWeatherDto from '../types/dto/open-weather-api/HistoryWeatherDto';
import OneCallApiWeatherDto from '../types/dto/open-weather-api/OneCallApiWeatherDto';
import ForecastWeatherDto from '../types/dto/open-weather-api/ForecastWeatherDto';

export async function retrieveHistoryCities(): Promise<HistoryCityDto[]> {
  const response = await axios.get(
    'http://bulk.openweathermap.org/sample/history.city.list.min.json.gz',
    { responseType: 'arraybuffer' }
  );
  const jsonBuffer = gunzipSync(response.data);
  return JSON.parse(jsonBuffer.toString());
}

export function filterHistoryCities(
  cities: HistoryCityDto[],
  parameters: WeatherFeatcherParams
): HistoryCityDto[] {
  const filterPredicates: ((city: HistoryCityDto) => boolean)[] = [];
  if (parameters.country) {
    filterPredicates.push((city) => city.city.country === parameters.country);
  }

  const filteredCities = filterPredicates.reduce(
    (acc, predicate) => acc.filter(predicate),
    cities
  );

  return parameters.cities
    ? filteredCities.slice(0, parameters.cities)
    : filteredCities;
}

export async function saveHistoryCities(
  cities: HistoryCityDto[]
): Promise<City[]> {
  return City.bulkCreate(
    cities.map((city) => ({
      id:
        typeof city.city.id === 'number'
          ? city.city.id
          : city.city.id.$numberLong,
      name: city.city.name,
      country: city.city.country,
      lat: city.city.coord.lat,
      lon: city.city.coord.lon,
    }))
  );
}

export async function retrieveWeatherForCity(
  city: City
): Promise<OneCallApiWeatherDto[]> {
  const historyWeather = await retrieveHistoryWeatherForCity(city);
  const forecastWeather = await retrieveForecastWeatherForCity(city);

  const oneCallForecastWeather = forecastWeather.daily.map((weather) => ({
    ...weather,
    temp: weather.temp.day,
    feels_like: weather.feels_like.day,
  }));

  return [
    ...historyWeather.map((weather) => weather.current),
    ...oneCallForecastWeather,
  ];
}

async function retrieveHistoryWeatherForCity(
  city: City
): Promise<HistoryWeatherDto[]> {
  // Free api subscription allows only 5 days of weather history
  const prevDays = [...Array(5).keys()].map((day) => -day - 1);

  const weathersPerDayResponsePromises = prevDays.map((day) =>
    axios.get<HistoryWeatherDto>(
      'http://api.openweathermap.org/data/2.5/onecall/timemachine',
      {
        params: {
          appid: process.env.weather_api_key,
          dt: getApiDate(day),
          lat: city.lat,
          lon: city.lon,
        },
      }
    )
  );

  const weathersPerDayResponses = await Promise.all(
    weathersPerDayResponsePromises
  );
  return weathersPerDayResponses.map((response) => response.data);
}

/**
 * Api requires a UNIX time in seconds
 *
 * @param day Days number from now
 */
function getApiDate(day: number): string {
  return (new Date().setUTCHours(24 * day, 0, 0, 0) / 1000).toFixed(0);
}

async function retrieveForecastWeatherForCity(
  city: City
): Promise<ForecastWeatherDto> {
  const response = await axios.get<ForecastWeatherDto>(
    'http://api.openweathermap.org/data/2.5/onecall',
    {
      params: {
        appid: process.env.weather_api_key,
        lat: city.lat,
        lon: city.lon,
        exclude: 'hourly,minutely,current',
      },
    }
  );

  return response.data;
}
