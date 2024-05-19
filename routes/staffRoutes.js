const express = require('express');
const staffController = require('../controllers/staffController');

const router = express.Router();

router
  .route('/')
  .get(staffController.getAllStaffs)
  .post(staffController.createStaff);

router
  .route('/:id')
  .get(staffController.getStaff)
  .patch(staffController.updateStaff)
  .delete(staffController.deleteStaff);

module.exports = router;
