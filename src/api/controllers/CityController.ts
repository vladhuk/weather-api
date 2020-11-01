import { RequestHandler } from 'express';
import { httpErrorHandler } from '../../utils/errorHandlers';
import * as cityService from '../../services/CityService';

export const getCities: RequestHandler = (req, res) => {
  cityService
    .getAllCities()
    .then((cities) => cities.map((city) => city.toJSON()))
    .then((cities) => res.json(cities))
    .catch((err) => httpErrorHandler(err, res));
};

export const getCityById: RequestHandler = (req, res) => {
  cityService
    .getCityByIdAndIncrementRequests(Number.parseInt(req.params.id))
    .then((city) => city.toJSON())
    .then((city) => res.json(city))
    .catch((err) => httpErrorHandler(err, res));
};

export const getAverageTemperatureInCityById: RequestHandler = (req, res) => {
  cityService
    .getAverageTempInCityById(Number.parseInt(req.params.id))
    .then((temp) => res.json(temp))
    .catch((err) => httpErrorHandler(err, res));
};

export const getFavouriteCity: RequestHandler = (req, res) => {
  cityService
    .getFavouriteCity()
    .then((city) => city.toJSON())
    .then((city) => res.json(city))
    .catch((err) => httpErrorHandler(err, res));
};
