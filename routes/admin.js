const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-ticket', adminController.getAddTicket);

router.get('/edit-ticket/:productId', adminController.getEditTicket);

// /admin/products => GET
router.get('/tickets', adminController.getTickets);

// /admin/add-product => POST
router.post('/add-ticket',isAuth, adminController.postAddTicket);

router.post('/edit-ticket',isAuth, adminController.postEditTicket);

router.post('/delete-ticket', isAuth, adminController.postDeleteTicket);

router.post('/analytics-earned', adminController.moneyEarned );
router.post('/analytics-customers', adminController.numberOfCust );

module.exports = router;
