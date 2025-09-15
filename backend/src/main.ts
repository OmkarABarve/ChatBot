import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ModuleRef } from '@nestjs/core'; // 👈 ensures ModuleRef is registered
import 'dotenv/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for frontend origin
  app.enableCors({
    origin: 'http://localhost:5173',  // or wherever your frontend runs
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
