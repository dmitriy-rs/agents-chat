import type { ModelMessage } from "ai";
import type { LanguageModelV2 } from '@ai-sdk/provider';
import { generateText } from "ai";

export async function generateTextResponse(model: LanguageModelV2, messages: ModelMessage[]) {
    const response = await generateText({
        model,
        messages
    })

    return response.text.trim()
}