import { Request, Response, NextFunction } from "express";
import { generateResponse, suggestFollowUpQuestions } from "../services/chat.service";

export const chatController = {
    async handleChat(req: Request, res: Response, next: NextFunction) {
        const { message } = req.body;
        if (!message || typeof message !== "string" || message.trim() === "") {
            return res.status(400).json({ error: "Invalid input: message cannot be empty or non-string" });
        }
        try {
            const response = await generateResponse(message);
            const followUpQuestions = await suggestFollowUpQuestions();
            res.json({ response: response?.content, followUpQuestions });
        } catch (error) {
            next(error);
        }
    },
};
