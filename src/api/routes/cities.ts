import { Router } from 'express';

const router = Router();

router.get('/');
router.get('/:id');
router.get('/:id/average-temp');
router.get('/favourite');

export default router;
