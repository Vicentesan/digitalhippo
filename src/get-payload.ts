import payload from 'payload'
import type { InitOptions } from 'payload/config'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).paylod

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

interface Args {
  initOptions?: Partial<InitOptions>
}

export async function getPayloadClient({ initOptions }: Args = {}) {
  if (cached.client) {
    return cached.client
  }

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing')
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: !initOptions?.express,
      ...(initOptions || {}),
    })
  }

  try {
    cached.client = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }

  return cached.client
}
