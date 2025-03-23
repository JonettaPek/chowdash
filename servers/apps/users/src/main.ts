import { NestFactory } from '@nestjs/core';
import { UsersModule } from './user.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);

  app.useStaticAssets(join(__dirname, '..', 'public')); // serves static files (CSS, images, JS) from the public directory
  app.setBaseViewsDir(join(__dirname, '..', 'servers/email-templates')); // sets base directory for template files used in rendering views
  app.setViewEngine('ejs'); // sets Embedded JavaScript (ejs) as the template engine

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
