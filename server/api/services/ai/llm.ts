import type { ModelMessage } from "ai";
import type { LanguageModelV2 } from '@ai-sdk/provider';
import { generateText } from "ai";

export async function generateChatResponse(model: LanguageModelV2, messages: ModelMessage[]) {
    const response = await generateText({
        model,
        messages
    })

    return response.text.trim()
}