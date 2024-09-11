import { PrismaClient } from '@prisma/client';
import { skinsSeed } from './skins';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.skin.createMany({
      data: skinsSeed,
    });
    console.log('Seeded');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
