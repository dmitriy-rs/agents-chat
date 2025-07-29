import type { UIMessage } from "ai"

export interface Chat {
  id: string
  title: string
  messages: UIMessage[]
}
