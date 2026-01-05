import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(3333, () => {
  console.log("Backend rodando na porta 3333");
});
