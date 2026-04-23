const {prisma} = require('../DB/db.config');

const addWaterLog = async (req, res) => {
  try {
    const { glasses, date } = req.body;
    const userId = req.user.id;
    const log = await prisma.waterLog.create({
      data: { userId, glasses, date: new Date(date) },
    });
    res.json({ success: true, message: 'Water log added', data: log });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add water log', data: null });
  }
};

const addSleepLog = async (req, res) => {
  try {
    const { durationHours, date } = req.body;
    const userId = req.user.id;
    const log = await prisma.sleepLog.create({
      data: { userId, durationHours, date: new Date(date) },
    });
    res.json({ success: true, message: 'Sleep log added', data: log });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add sleep log', data: null });
  }
};

const addTrainingLog = async (req, res) => {
  try {
    const { durationMinutes, date } = req.body;
    const userId = req.user.id;
    const log = await prisma.trainingLog.create({
      data: { userId, durationMinutes, date: new Date(date) },
    });
    res.json({ success: true, message: 'Training log added', data: log });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add training log', data: null });
  }
};

const addWeightLog = async (req, res) => {
  try {
    const { weight, date } = req.body;
    const userId = req.user.id;
    const log = await prisma.weightLog.create({
      data: { userId, weight, date: new Date(date) },
    });
    res.json({ success: true, message: 'Weight log added', data: log });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add weight log', data: null });
  }
};

const addBfpLog = async (req, res) => {
  try {
    const { bfp, date } = req.body;
    const userId = req.user.id;
    const log = await prisma.bfpLog.create({
      data: { userId, bfp, date: new Date(date) },
    });
    res.json({ success: true, message: 'BFP log added', data: log });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add BFP log', data: null });
  }
};

const addDailyLog = async (req, res) => {
  try {
    const { carbs, protein, fat, date } = req.body;
    const userId = req.user.id;
    const log = await prisma.dailyLog.create({
      data: { userId, carbs, protein, fat, date: new Date(date) },
    });
    res.json({ success: true, message: 'Daily log added', data: log });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add daily log', data: null });
  }
};

const getDashboardLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const [waterLogs, sleepLogs, trainingLogs, weightLogs, bfpLogs, dailyLogs] = await Promise.all([
      prisma.waterLog.findMany({ where: { userId } }),
      prisma.sleepLog.findMany({ where: { userId } }),
      prisma.trainingLog.findMany({ where: { userId } }),
      prisma.weightLog.findMany({ where: { userId } }),
      prisma.bfpLog.findMany({ where: { userId } }),
      prisma.dailyLog.findMany({ where: { userId } }),
    ]);
    res.json({
      success: true,
      message: 'Dashboard logs fetched',
      data: { waterLogs, sleepLogs, trainingLogs, weightLogs, bfpLogs, dailyLogs },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard logs', data: null });
  }
};

module.exports = {
  addWaterLog,
  addSleepLog,
  addTrainingLog,
  addWeightLog,
  addBfpLog,
  addDailyLog,
  getDashboardLogs,
};
