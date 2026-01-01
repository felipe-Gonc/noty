import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONECTADO COM SUCESSO.");
  } catch (error) {
    console.error("Error ao conectar com o MONGODB", error);
  }
};
