import swaggerAutogen from "swagger-autogen";
import path from "path";

const doc = {
  info: {
    title: "WebVirtus API",
    description: "Automatically generated Swagger docs",
    version: "1.0.0",
  },
  host: "localhost:4000",
  basePath: "/",
  schemes: ["http"],
  tags: [
    { name: "Authentication", description: "Authentication related endpoints" },
    { name: "Users", description: "User management endpoints" },
    { name: "Projects", description: "Project management endpoints" },
    { name: "Milestones", description: "Milestone management endpoints" },
    { name: "Cost", description: "Cost management endpoints" },
  ],
};

const outputFile = path.resolve(process.cwd(), "swagger-output.json");
const endpointsFiles = [
  "./src/routes/auth.routes.ts",
  "./src/routes/user.routes.ts",
  "./src/routes/project.routes.ts",
  "./src/routes/milestones.routes.ts",
  "./src/routes/cost.routes.ts",
];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully!");
});
