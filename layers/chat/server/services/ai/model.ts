import { createOpenAI } from '@ai-sdk/openai'
import { createGroq } from '@ai-sdk/groq';
import type { OpenAIChatModelId } from '@ai-sdk/openai/internal'

export function createOpenAIModel() {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')

  const openai = createOpenAI({ apiKey })

  return (model: OpenAIChatModelId = 'gpt-4o-mini') => openai(model)
}

export function createGroqAIModel() {
  const apiKey = useRuntimeConfig().groqApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')

  const groq = createGroq({ apiKey })

  return (model: Parameters<typeof groq>[0] = 'openai/gpt-oss-20b') => groq(model)
}

