const express = require('express');
const billController = require('../controllers/billController');

const router = express.Router();

router
  .route('/')
  .get(billController.getAllBills)
  .post(billController.createBill);

router
  .route('/:id')
  .get(billController.getBill)
  .patch(billController.updateBill)
  .delete(billController.deleteBill);

module.exports = router;
