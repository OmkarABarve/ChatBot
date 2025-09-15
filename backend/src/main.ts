import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ModuleRef } from '@nestjs/core'; // 👈 ensures ModuleRef is registered
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enhanced CORS configuration for production
  const corsOptions = {
    origin: [
      'http://localhost:5173', // Local development
      'https://aiexcelinterview.netlify.app', // Your production frontend
      // Add other allowed origins as needed
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true, // Allow cookies/credentials
    optionsSuccessStatus: 200, // For legacy browser support
  };
  
  app.enableCors(corsOptions);

  // ✅ Security headers with proper types
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    next();
  });

  // ✅ Use environment variable for port with fallback
  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces for deployment
  console.log(`🚀 Application is running on port ${port}`);
}
bootstrap();
