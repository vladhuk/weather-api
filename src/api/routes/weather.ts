import { Router } from 'express';
import * as weatherController from '../controllers/WeatherController';

const router = Router();

router.get('/', weatherController.getWeather);

export default router;
