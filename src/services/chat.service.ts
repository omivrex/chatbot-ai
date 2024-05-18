import { config } from "../configs/config";
import { Message } from "../types/messages.types";

const OpenAi = config.openAi;

// The appropriate way to store this is using a caching service like redis
const messages: Message[] = [{ role: "system", content: "Be a good assistant" }];
export async function generateResponse(message: string): Promise<Message | undefined> {
    try {
        const userPrompt: Message = { role: "user", content: message };
        messages.push(userPrompt);
        const chatCompletion = await OpenAi.chat.completions.create({
            messages,
            model: "gpt-3.5-turbo",
        });
        if (chatCompletion.choices[0].message.content) {
            const aiResponse: Message = {
                role: "assistant",
                content: chatCompletion.choices[0].message.content,
            };
            messages.push(aiResponse);
            return aiResponse;
        } else {
            throw new Error("Failed to get response from OpenAIl, message content is null");
        }
    } catch (error) {
        throw error;
    }
}

const NUMBER_OF_FOLLOWUP_QUESTIONS = 4;
const FOLLOWUP_QUESTION_PROMPT: Message = {
    role: "system",
    content: `generate ${NUMBER_OF_FOLLOWUP_QUESTIONS} followup questions for the last message. Return the questions in a json array of the format [{"question": string},...]`,
};
export async function suggestFollowUpQuestions(): Promise<void> {
    try {
        const chatCompletion = await OpenAi.chat.completions.create({
            messages: [...messages, FOLLOWUP_QUESTION_PROMPT],
            model: "gpt-3.5-turbo",
        });
        if (chatCompletion.choices[0].message.content) {
            const followupQuestion = JSON.parse(chatCompletion.choices[0].message.content);
            return followupQuestion;
        } else {
            throw new Error("Failed to generate follow-up questions from OpenAIl, message content is null");
        }
    } catch (error) {
        throw error;
    }
}
