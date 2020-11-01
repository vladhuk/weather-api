import { Router } from 'express';
import cities from './cities';
import weather from './weather';

const router = Router();

router.use('/cities', cities);
router.use('/weather', weather);

export default router;
