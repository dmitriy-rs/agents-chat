import { createOpenAI } from '@ai-sdk/openai'
import type { OpenAIChatModelId } from '@ai-sdk/openai/internal'

export function createOpenAIModel(model: OpenAIChatModelId = 'gpt-4o-mini') {
  const apiKey = useRuntimeConfig().openaiApiKey
  const openai = createOpenAI({ apiKey })
  return openai(model)
}
