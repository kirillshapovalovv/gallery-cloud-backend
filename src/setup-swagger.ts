import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type Options = {
  version: string;
};

export const setupSwagger = (app: NestExpressApplication, options: Options) => {
  const config = new DocumentBuilder()
    .setTitle('Gallery Cloud')
    .setDescription('Gallery Cloud API')
    .setVersion(options.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
