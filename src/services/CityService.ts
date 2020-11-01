import Sequelize, { Op } from 'sequelize';
import CityNotFoundError from '../errors/CityNotFoundError';
import City from '../models/City';
import Weather from '../models/Weather';

export async function deleteAllCitiesWithWeather(): Promise<number> {
  return City.destroy({ where: { id: { [Op.gte]: 0 } } });
}

export async function getAllCities(): Promise<City[]> {
  return City.findAll();
}

export async function getCityById(cityId: number): Promise<City> {
  const city = await City.findByPk(cityId);

  if (!city) {
    throw new CityNotFoundError(cityId);
  }

  return city;
}

export async function getCityByIdAndIncrementRequests(
  cityId: number
): Promise<City> {
  const city = await getCityById(cityId);
  await city.increment('requestsNumber');
  return city.reload();
}

interface AverageTemp {
  temp: number | null;
}

export async function getAverageTempInCityById(
  cityId: number
): Promise<number> {
  const averageTemp = <AverageTemp>await Weather.findOne({
    where: { cityId },
    attributes: [[Sequelize.fn('AVG', Sequelize.col('temp')), 'temp']],
  });

  if (averageTemp.temp === null) {
    throw new CityNotFoundError(cityId);
  }

  return averageTemp.temp;
}

export async function getFavouriteCity(): Promise<City> {
  const maxRequestsNumber: number = await City.max('requestsNumber');

  const city = await City.findOne({
    where: {
      requestsNumber: maxRequestsNumber,
    },
  });

  if (!city) {
    throw new CityNotFoundError();
  }

  return city;
}
