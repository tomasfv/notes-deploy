import { Sequelize, type Options } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isLambda = Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);

// En Lambda no conviene mantener un pool grande: cada invocación cierra sus
// conexiones (ver src/lambda.ts) y los proveedores gestionados limitan el
// número de conexiones simultáneas.
const commonOptions: Options = {
  dialect: "postgres",
  logging: false,
  ...(isLambda
    ? {
        pool: {
          max: 2,
          min: 0,
          idle: 0,
          acquire: 3000,
          evict: 15000,
        },
      }
    : {}),
};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      ...commonOptions,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME || "notesapp",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "yourPassword",
      {
        ...commonOptions,
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432", 10),
      },
    );

export default sequelize;
