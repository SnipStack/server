import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: true,
  }),
);
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
