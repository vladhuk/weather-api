import { Router } from 'express';
import * as citiesController from '../controllers/CityController';

const router = Router();

router.get('/', citiesController.getCities);
router.get('/favourite', citiesController.getFavouriteCity);
router.get('/:id', citiesController.getCityById);
router.get(
  '/:id/average-temp',
  citiesController.getAverageTemperatureInCityById
);

export default router;
