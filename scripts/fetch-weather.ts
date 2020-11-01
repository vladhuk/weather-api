import { sequelize } from '../src/config';
import {
  filterHistoryCities,
  retrieveHistoryCities,
  retrieveWeatherForCity,
  saveHistoryCities,
} from '../src/services/OpenWeatherMapService';
import WeatherFeatcherParams from '../src/types/utility/WeatherFeatcherParams';
import Weather, { WeatherCreationAttributes } from '../src/models/Weather';
import { deleteAllCitiesWithWeather } from '../src/services/CityService';

const params: WeatherFeatcherParams = {
  country: process.env.country || 'US',
  cities: (process.env.cities && parseInt(process.env.cities)) || 2,
};

(async () => {
  const historyCities = await retrieveHistoryCities();
  const filteredHistoryCities = filterHistoryCities(historyCities, params);

  await deleteAllCitiesWithWeather();

  const cities = await saveHistoryCities(filteredHistoryCities);

  const weathersForCities: WeatherCreationAttributes[][] = await Promise.all(
    cities.map(async (city) => {
      const weathers = await retrieveWeatherForCity(city);

      return weathers.map((weather) => ({
        date: new Date(weather.dt * 1000),
        temp: weather.temp,
        feelsLike: weather.feels_like,
        pressure: weather.pressure,
        humidity: weather.humidity,
        dewPoint: weather.dew_point,
        clouds: weather.clouds,
        windSpeed: weather.wind_speed,
        windDeg: weather.wind_deg,

        cityId: city.id,
      }));
    })
  );

  const flattenedWeathers: WeatherCreationAttributes[] = [];
  weathersForCities.forEach((weathers) => flattenedWeathers.push(...weathers));

  await Weather.bulkCreate(flattenedWeathers);
})();
