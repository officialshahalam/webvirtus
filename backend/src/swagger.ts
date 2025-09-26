import swaggerAutogen from "swagger-autogen";
import path from "path";

const doc = {
  info: {
    title: "Auth Service Api",
    description: "Automatically generate swagger docs",
    version: "1.0.0",
  },
  host: "localhost:4000",
  basePath: "/api",
  schemes: ["https"],
};

const outputFile = path.resolve(process.cwd(), "swagger-output.json");
const endpointsFiles = [
  "./src/routes/auth.routes.ts",
  "./src/routes/cost.routes.ts",
];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully!");
});
