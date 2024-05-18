import express from "express";
import chatRoutes from "./routes/chat.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { requestLogger } from "./middlewares/requestLogger.middleware";

const app = express();

app.use(express.json());
app.use(requestLogger); // Use the request logger middleware
app.use("/api", chatRoutes);

// Error handling middleware should be the last one to use
app.use(errorHandler);

export default app;
