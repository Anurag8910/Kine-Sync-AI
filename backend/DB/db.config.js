const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = { prisma, connectDb };