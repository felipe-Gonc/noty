import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./models/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleWare
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(distPath));

  // ✅ fallback correto para SPA
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

//faz o banco de dados carregar primeiro;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.error("Serve iniciado na porta:", PORT);
  });
});
