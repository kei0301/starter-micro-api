import { Router } from 'express';
import payment from './Payment';

const router: Router = Router();
router.use('/payment', payment);

export default router;
