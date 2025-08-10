import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { chats, messages, parts, projects, users } from './schema'
import { mapUIMessagePartsToDBParts } from './mapper'
import type { ChatMessage } from '../../shared/types/chat'

const db = drizzle(process.env.DATABASE_URL!)

interface SeedUser {
  email: string
  name: string
  provider: string
  providerId: string
}

interface SeedProject {
  name: string
}

interface SeedChat {
  title: string
  hasProject: boolean
  messages: Array<{
    role: ChatMessage['role']
    parts: ChatMessage['parts']
  }>
}

interface SeedConfig {
  users: SeedUser[]
  projects: SeedProject[]
  chats: SeedChat[]
}

const SEED_CONFIG: SeedConfig = {
  users: [
    {
      email: 'demo@example.com',
      name: 'Demo User',
      provider: 'demo',
      providerId: 'demo-user-001',
    },
  ],
  projects: [
    {
      name: 'Nuxt Project',
    },
  ],
  chats: [
    {
      title: 'Nuxt.js project help',
      hasProject: true,
      messages: [
        {
          role: 'user',
          parts: [
            {
              type: 'text',
              text: 'Hello, can you help me with my Nuxt.js project?',
            },
          ],
        },
        {
          role: 'assistant',
          parts: [
            {
              type: 'text',
              text: "Of course! I'd be happy to help with your Nuxt.js project. What specific questions or issues do you have?",
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              type: 'text',
              text: 'How do I implement server-side rendering?',
            },
          ],
        },
        {
          role: 'assistant',
          parts: [
            {
              type: 'text',
              text: "Nuxt.js provides server-side rendering out of the box! You don't need to do any special configuration for basic SSR. If you need specific optimizations, we can discuss those in detail.",
            },
          ],
        },
      ],
    },
    {
      title: 'General Discussion',
      hasProject: false,
      messages: [
        {
          role: 'user',
          parts: [
            {
              type: 'text',
              text: 'Hi there! This is a chat without a specific project.',
            },
          ],
        },
        {
          role: 'assistant',
          parts: [
            {
              type: 'text',
              text: 'Hello! How can I help you today?',
            },
          ],
        },
      ],
    },
  ],
}

async function cleanDatabase() {
  console.log('🧹 Cleaning database...')
  await db.delete(parts)
  await db.delete(messages)
  await db.delete(chats)
  await db.delete(projects)
  await db.delete(users)
  console.log('✅ Database cleaned')
}

async function createUser(userData: SeedUser) {
  const [user] = await db.insert(users).values(userData).returning()
  console.log('✅ Created user:', user.email)
  return user
}

async function createProject(projectData: SeedProject, userId: string) {
  const [project] = await db
    .insert(projects)
    .values({
      ...projectData,
      userId,
    })
    .returning()
  console.log('✅ Created project:', project.name)
  return project
}

async function createChat(
  chatData: SeedChat,
  userId: string,
  projectId?: string,
) {
  const [chat] = await db
    .insert(chats)
    .values({
      title: chatData.title,
      userId,
      projectId: chatData.hasProject ? projectId : undefined,
    })
    .returning()
  console.log('✅ Created chat:', chat.title)
  return chat
}

async function createMessage(
  messageData: { role: ChatMessage['role']; parts: ChatMessage['parts'] },
  chatId: string,
  userId: string,
  index: number,
) {
  const [message] = await db
    .insert(messages)
    .values({
      role: messageData.role,
      userId,
      chatId,
    })
    .returning()

  const mappedParts = mapUIMessagePartsToDBParts(messageData.parts, message.id)
  await db.insert(parts).values(mappedParts)

  console.log(`  ✅ Message ${index + 1}: ${message.role}`)
  return message
}

async function seedDatabase() {
  const createdUsers: (typeof users.$inferSelect)[] = []
  const createdProjects: (typeof projects.$inferSelect)[] = []

  for (const userData of SEED_CONFIG.users) {
    const user = await createUser(userData)
    createdUsers.push(user)
  }

  for (const projectData of SEED_CONFIG.projects) {
    const project = await createProject(projectData, createdUsers[0].id)
    createdProjects.push(project)
  }

  for (const chatData of SEED_CONFIG.chats) {
    const chat = await createChat(
      chatData,
      createdUsers[0].id,
      chatData.hasProject ? createdProjects[0].id : undefined,
    )

    for (const [index, messageData] of chatData.messages.entries()) {
      await createMessage(messageData, chat.id, createdUsers[0].id, index)
    }
  }
}

async function main() {
  try {
    console.log('🌱 Starting seed...')

    const shouldClean = process.argv.includes('--clean')
    if (shouldClean) {
      await cleanDatabase()
    }

    await seedDatabase()

    console.log('🎉 Seed completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

main()
