import { config } from "../configs/config";
import { truncateMessages } from "../helpers/messageCacheTruncator.helper";
import { Message } from "../types/messages.types";

const OpenAi = config.openAi;
const MAX_TOKENS = 4097; // gpt-3.5-turbo max tokens

// The appropriate way to store this is using a caching service like redis
const messagesCache: Message[] = [{ role: "system", content: "Be a good assistant" }];

export async function generateResponse(message: string): Promise<Message | undefined> {
    try {
        const userPrompt: Message = { role: "user", content: message };
        messagesCache.push(userPrompt);
        const chatCompletion = await OpenAi.chat.completions.create({
            messages: truncateMessages(messagesCache, MAX_TOKENS),
            model: "gpt-3.5-turbo",
        });
        if (chatCompletion.choices[0].message.content) {
            const aiResponse: Message = {
                role: "assistant",
                content: chatCompletion.choices[0].message.content,
            };
            messagesCache.push(aiResponse);
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
            messages: truncateMessages([...messagesCache, FOLLOWUP_QUESTION_PROMPT], MAX_TOKENS),
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
