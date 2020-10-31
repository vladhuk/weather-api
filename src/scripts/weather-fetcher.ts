import yargs from 'yargs';
import { sequelize } from '../config';
import {
  filterHistoryCities,
  retrieveHistoryCities,
  retrieveWeatherForCity,
  saveHistoryCities,
} from '../services/OpenWeatherMapService';
import WeatherFeatcherParams from '../types/utility/WeatherFeatcherParams';
import sleep from 'sleep-promise';
import Weather, { WeatherCreationAttributes } from '../models/Weather';
import { deleteAllCitiesWithWeather } from '../services/CityService';

const argv = <WeatherFeatcherParams>yargs(process.argv).argv;

(async () => {
  const historyCities = await retrieveHistoryCities();
  const filteredHistoryCities = filterHistoryCities(historyCities, argv);

  await sequelize.sync();

  await deleteAllCitiesWithWeather();

  const cities = await saveHistoryCities(filteredHistoryCities);

  console.log(
    `Fetching weather... Wait ${Math.floor(cities.length / 10)} minutes.`
  );

  const weathersForCities: WeatherCreationAttributes[][] = await Promise.all(
    cities.map(async (city, i) => {
      // Free API allows only 60 requests per minute. For one city it makes 6 requests
      if ((i + 1) % 10 === 0) {
        await sleep(60 * 1000);
      }

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
