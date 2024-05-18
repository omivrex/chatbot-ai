import { Message } from "../types/messages.types";
import { calculateTotalTokens, estimateTokens } from "./tokenCalculator.helper";

export function truncateMessages(messages: Message[], maxTokens: number): Message[] {
    let totalTokens = calculateTotalTokens(messages);
    const truncatedMessages = [...messages];

    while (totalTokens > maxTokens && truncatedMessages.length > 0) {
        const removedMessage = truncatedMessages.shift();
        if (removedMessage) {
            totalTokens -= estimateTokens(removedMessage.content);
        }
    }

    return truncatedMessages;
}
