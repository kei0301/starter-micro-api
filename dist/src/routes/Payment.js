"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../controllers/payment");
const router = (0, express_1.Router)();
router.route('/deposit').post(payment_1.deposit);
router.route('/getdata').post(payment_1.getdata);
router.route('/request').post(payment_1.request);
router.route('/getAPY').get(payment_1.getAPY);
router.route('/updateAvailableFlag').post(payment_1.updateAvailableFlag);
router.route('/updateAPY').post(payment_1.updateAPY);
router.route('/checkedWithdraw').post(payment_1.checkedWithdraw);
router.route('/getTVL').get(payment_1.getTVL);
router.route('/getavailable').get(payment_1.getavailable);
router.route('/getWithdrawlist').get(payment_1.getWithdrawlist);
exports.default = router;
//# sourceMappingURL=Payment.js.map