import { createOpenAI } from '@ai-sdk/openai'
import type { OpenAIChatModelId } from '@ai-sdk/openai/internal'

export function createOpenAIModel(apiKey: string) {
  const openai = createOpenAI({ apiKey })

  return (model: OpenAIChatModelId = 'gpt-4o-mini') => openai(model)
}
