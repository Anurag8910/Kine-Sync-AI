const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const logController = require('../controller/logController');

// Water Log
router.post('/water', auth, logController.addWaterLog);
// Sleep Log
router.post('/sleep', auth, logController.addSleepLog);
// Training Log
router.post('/training', auth, logController.addTrainingLog);
// Weight Log
router.post('/weight', auth, logController.addWeightLog);
// BFP Log
router.post('/bfp', auth, logController.addBfpLog);
// Daily Log
router.post('/daily', auth, logController.addDailyLog);
// Dashboard
router.get('/dashboard', auth, logController.getDashboardLogs);

module.exports = router;
