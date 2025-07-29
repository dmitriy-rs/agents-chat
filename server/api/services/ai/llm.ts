import type { UIMessage } from "ai";
import type { LanguageModelV2 } from '@ai-sdk/provider';
import { convertToModelMessages, generateText } from "ai";

export async function generateChatResponse(model: LanguageModelV2, messages: UIMessage[]) {
    const modelMessages = convertToModelMessages(messages)

    const response = await generateText({
        model,
        messages: modelMessages
    })

    return response.text.trim()
}