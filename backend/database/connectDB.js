import { prisma } from './prismaClient.js';

export const connectMongo = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.log('Error while connecting to MongoDB...');
    console.log(error);

    await prisma.$disconnect();

    process.exit(1);
  }
};
