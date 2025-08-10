import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import * as relations from './relations'

const connectionString = process.env.NUXT_DATABASE_URL!

const client = postgres(connectionString, { prepare: false })

const db = drizzle(client, {
  schema: { ...schema, ...relations },
})

export default db
