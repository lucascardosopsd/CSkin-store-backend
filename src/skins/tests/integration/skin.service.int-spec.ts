import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('test POST /skin', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    // Create prisma tables in database
    execSync('yarn prisma db push', {
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    });

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    await app.init();
  });

  it('shold be create a new skin', async () => {
    const res = await request(await app.getHttpServer())
      .post('/skins')
      .send({
        name: 'Teste',
        image: 'https://i.imgur.com/pqDs5Bm.png',
        category: 'pistola',
        float: 0.2,
        price: 100000,
      });

    expect(res.statusCode).toBe(201);
  });

  it('should get a skin', async () => {
    const { body: newSkin } = await request(await app.getHttpServer())
      .post('/skins')
      .send({
        name: 'Teste',
        image: 'https://i.imgur.com/pqDs5Bm.png',
        category: 'pistola',
        float: 0.2,
        price: 100000,
      });

    const getRes = await request(await app.getHttpServer()).get(
      `/skins/${newSkin.id}`,
    );

    expect(getRes.statusCode).toBe(200);
  });

  it('should update a skin', async () => {
    const { body: newSkin } = await request(await app.getHttpServer())
      .post('/skins')
      .send({
        name: 'Teste',
        image: 'https://i.imgur.com/pqDs5Bm.png',
        category: 'pistola',
        float: 0.2,
        price: 100000,
      });

    const updateRes = await request(await app.getHttpServer())
      .patch(`/skins/${newSkin.id}`)
      .send({
        name: 'Teste 2',
      });

    expect(updateRes.statusCode).toBe(200);
  });

  it('should delete a skin', async () => {
    const { body: newSkin } = await request(await app.getHttpServer())
      .post('/skins')
      .send({
        name: 'Teste',
        image: 'https://i.imgur.com/pqDs5Bm.png',
        category: 'pistola',
        float: 0.2,
        price: 100000,
      });

    const updateRes = await request(await app.getHttpServer()).delete(
      `/skins/${newSkin.id}`,
    );

    expect(updateRes.statusCode).toBe(200);
  });

  it('should get many skins paginated', async () => {
    const manySkins = await request(await app.getHttpServer())
      .get('/skins')
      .query({
        page: 0,
        take: 2,
      });

    expect(manySkins.statusCode).toBe(200);
  });

  it('should get many skins paginated by start price', async () => {
    const manySkins = await request(await app.getHttpServer())
      .get('/skins')
      .query({
        page: 0,
        take: 10,
        startPrice: 0,
      });

    expect(manySkins.statusCode).toBe(200);
  });

  it('should get many skins paginated by price range', async () => {
    const manySkins = await request(await app.getHttpServer())
      .get('/skins')
      .query({
        page: 0,
        take: 10,
        startPrice: 0,
        endPrice: 100000,
      });

    expect(manySkins.statusCode).toBe(200);
  });

  it('should get many skins paginated by orderBy', async () => {
    const manySkins = await request(await app.getHttpServer())
      .get('/skins')
      .query({
        page: 0,
        take: 10,
        orderBy: 'name',
      });

    expect(manySkins.statusCode).toBe(200);
  });

  it('should get many skins paginated by name', async () => {
    const manySkins = await request(await app.getHttpServer())
      .get('/skins')
      .query({
        page: 0,
        take: 10,
        name: 'test',
      });

    expect(manySkins.statusCode).toBe(200);
  });

  it('should get many skins paginated by float', async () => {
    const manySkins = await request(await app.getHttpServer())
      .get('/skins')
      .query({
        page: 0,
        take: 10,
        float: 0.2,
      });

    expect(manySkins.statusCode).toBe(200);
  });
});
