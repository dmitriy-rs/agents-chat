import { createOpenAI } from '@ai-sdk/openai'
import type { OpenAIChatModelId } from '@ai-sdk/openai/internal'

export function createOpenAIModel() {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')

  const openai = createOpenAI({ apiKey })

  return (model: OpenAIChatModelId = 'gpt-4o-mini') => openai(model)
}
