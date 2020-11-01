import { RequestHandler } from 'express';
import { httpErrorHandler } from '../../utils/errorHandlers';
import * as weatherService from '../../services/WeatherService';

export const getWeather: RequestHandler = (req, res) => {
  weatherService
    .getWeather(
      Number.parseInt(<string>req.query.cityId),
      <string>req.query.date
    )
    .then((weather) => weather.map((w) => w.toJSON()))
    .then((weather) => res.json(weather))
    .catch((err) => httpErrorHandler(err, res));
};
