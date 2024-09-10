import { PrismaClient } from '@prisma/client';
import { skinsSeed } from './skins';

const prisma = new PrismaClient();

const seed = () => {
  prisma.skin
    .createMany({
      data: skinsSeed,
    })
    .then(() => prisma.$disconnect());
};

seed();
