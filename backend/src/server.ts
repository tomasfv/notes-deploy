import app from "./app";
import sequelize from "./config/database";
import "./models";
import { seedUser } from "./seeders/createUser";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Solo desarrollo local: en producción el esquema se gestiona con
    // migraciones y el usuario admin se crea una sola vez.
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: false });
      console.log("Database synchronized");

      await seedUser();
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
