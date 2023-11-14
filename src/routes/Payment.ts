import { Router } from 'express';
import {
  deposit,
  getdata,
  getTVL,
  request,
  getWithdrawlist,
  checkedWithdraw,
  getavailable,
  updateAvailableFlag,
  getAPY,
  updateAPY
} from '../controllers/payment';


const router: Router = Router();

router.route('/deposit').post(deposit);
router.route('/getdata').post(getdata);
router.route('/request').post(request);
router.route('/getAPY').get(getAPY);
router.route('/updateAvailableFlag').post(updateAvailableFlag);
router.route('/updateAPY').post(updateAPY);
router.route('/checkedWithdraw').post(checkedWithdraw);
router.route('/getTVL').get(getTVL);
router.route('/getavailable').get(getavailable);
router.route('/getWithdrawlist').get(getWithdrawlist);

export default router;
