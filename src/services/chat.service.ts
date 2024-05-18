import axios from "axios";
import { config } from "../configs/config";

interface AIResponse {
    data: {
        choices: {
            text: string;
        }[];
    };
}

export async function generateResponse(message: string): Promise<string> {
    try {
        const response = await axios.post<AIResponse>(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davinci-002",
                prompt: message,
                max_tokens: 50,
                temperature: 0.7,
                n: 1,
                stop: ["\n"],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${config.openaiApiKey}`,
                },
            }
        );

        return response.data.choices[0].text.trim();
    } catch (error) {
        throw new Error("Failed to generate response");
    }
}

export function suggestFollowUpQuestions(userMessage: string, response: string): string[] {
    // Mock follow-up questions
    return [
        `How many billionaires are there in the United States compared to other countries?`,
        `What industries are most common among billionaires in the United States?`,
        `Who is currently the richest billionaire in the world and what is their net worth?`,
        `How has the number of billionaires changed over the past decade in the United States?`,
    ];
}
