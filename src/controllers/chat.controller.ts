import { Request, Response, NextFunction } from "express";
import { generateResponse, suggestFollowUpQuestions } from "../services/chat.service";

export const chatController = {
    async handleChat(req: Request, res: Response, next: NextFunction) {
        const { message } = req.body;

        try {
            const response = await generateResponse(message);
            const followUpQuestions = await suggestFollowUpQuestions();
            res.json({ response: response?.content, followUpQuestions });
        } catch (error) {
            next(error);
        }
    },
};
