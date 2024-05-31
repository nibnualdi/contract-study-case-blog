import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";

const router = Router();

const options: SwaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Contract Study Case Blog",
      version: "0.1.0",
      description:
        "This is application with user, file, post, category models made with express ts",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Ibnu Aldi Nugroho",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/v1`,
      },
    ],
  },
  apis: ["src/swagger/*.yml"],
};

const specs = swaggerJsdoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default router;
