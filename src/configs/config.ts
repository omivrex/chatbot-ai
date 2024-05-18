import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
    port: process.env.PORT || 3000,
    openAi: openAi,
};
