import express from "express";
import chatRoutes from "./routes/chat.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { requestLogger } from "./middlewares/requestLogger.middleware";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use("/api", chatRoutes);

app.use(errorHandler);

export default app;
