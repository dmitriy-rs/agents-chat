import { createOpenAI } from '@ai-sdk/openai'
import { createGroq } from '@ai-sdk/groq'
import type { OpenAIChatModelId } from '@ai-sdk/openai/internal'

export function createOpenAIModel() {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')

  const openai = createOpenAI({ apiKey })

  return (model: OpenAIChatModelId = 'gpt-5-mini') => openai(model)
}

export function createGroqAIModel() {
  const apiKey = useRuntimeConfig().groqApiKey
  if (!apiKey) throw new Error('Missing Groq API key')

  const groq = createGroq({ apiKey })

  return (model: Parameters<typeof groq>[0] = 'qwen/qwen3-32b') => groq(model)
}

export function createDolphinAIModel() {
  const apiKey = useRuntimeConfig().hfToken
  if (!apiKey) throw new Error('Missing HuggingFace token')

  const openai = createOpenAI({
    apiKey,
    baseURL: 'https://router.huggingface.co/v1',
  })

  return (
    model: OpenAIChatModelId = 'dphn/Dolphin-Mistral-24B-Venice-Edition:featherless-ai',
  ) => openai(model)
}

export function createChatModel() {
  return createGroqAIModel()
}
