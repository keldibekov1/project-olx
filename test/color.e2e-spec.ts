import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('ColorController (e2e)', () => {
  let app: INestApplication;
  let colorId: string;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = moduleFixture.get(PrismaService);
  });

  it('/color (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/color')
      .send({ name: "qizil" })

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('qizil');

    colorId = response.body.id;
  });

  it('/color/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/color/${colorId}`)

    expect(response.body).toHaveProperty('id', colorId);
    expect(response.body.name).toBe('qizil');
  });

  it('/color/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/color/${colorId}`)
      .send({ name: "kok" })

    expect(response.body).toHaveProperty('name', "kok");
  });

  it('/color/:id (DELETE) ', async () => {
    await request(app.getHttpServer())
      .delete(`/color/${colorId}`)
      .expect(200);
  });
  
});
