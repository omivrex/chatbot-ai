import { Message } from "../types/messages.types";

export function estimateTokens(text: string): number {
    // Rough estimate: 1 token ~= 4 characters in English text.
    const APPROXIMATE_NUMBER_OF_CHARACTERS_PER_TOKEN_IN_ENGLISH = 4;
    return Math.ceil(text.length / APPROXIMATE_NUMBER_OF_CHARACTERS_PER_TOKEN_IN_ENGLISH);
}

export function calculateTotalTokens(messages: Message[]): number {
    return messages.reduce((total, message) => total + estimateTokens(message.content), 0);
}
