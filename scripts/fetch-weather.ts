import {
  filterHistoryCities,
  retrieveHistoryCities,
  retrieveWeatherForCity,
  saveHistoryCities,
} from '../src/services/OpenWeatherMapService';
import WeatherFeatcherParams from '../src/types/utility/WeatherFeatcherParams';
import Weather, { WeatherCreationAttributes } from '../src/models/Weather';
import { deleteAllCitiesWithWeather } from '../src/services/CityService';
import { mapOneCallApiWeatherDtoToWeatherCreationAttributes } from '../src/mappers/weatherMappers';
import { flatten } from 'lodash';

const params: WeatherFeatcherParams = {
  country: process.env.country || 'US',
  cities: (process.env.cities && parseInt(process.env.cities)) || 2,
};

(async () => {
  console.log('Fetching cities...');

  const historyCities = await retrieveHistoryCities();
  const filteredHistoryCities = filterHistoryCities(historyCities, params);

  await deleteAllCitiesWithWeather();

  console.log('Saving cities...');

  const cities = await saveHistoryCities(filteredHistoryCities);

  console.log('Fetching weather...');

  const promisesWeatherListsForCities = cities.map(async (city) => {
    const weatherList = await retrieveWeatherForCity(city);

    return weatherList.map((weather) =>
      mapOneCallApiWeatherDtoToWeatherCreationAttributes(weather, city.id)
    );
  });

  const weatherListsForCities = await Promise.all(
    promisesWeatherListsForCities
  );

  console.log('Saving cities...');

  await Weather.bulkCreate(flatten(weatherListsForCities));

  console.log('Finishing...');
})();
