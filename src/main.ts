import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ApiKeyGuard } from "./guards/api-key.guard";
import { corsMiddleware } from "./middleware/cors.middleware";
import { urlencoded, json } from "express";

async function start() {
  const PORT = process.env.PORT || 5050;
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle("Simple backend for NFD")
    .setVersion("1.0.0")
    .addTag("Nikolai Fomin")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.useGlobalGuards(new ApiKeyGuard());
  app.use(corsMiddleware);
  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));

  app.listen(PORT, () =>
    console.log(`Server has been started on port: ${PORT}`),
  );
}

start();
