import sequelize from "./dbConfig";


const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    // Sync models
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced with MySQL!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

export default initializeDatabase;