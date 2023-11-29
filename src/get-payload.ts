import payload, { Payload } from 'payload'
import type { InitOptions } from 'payload/config'
import dotenv from 'dotenv'
import path from 'path'
import nodemailer from 'nodemailer'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
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

export async function getPayloadClient({
  initOptions,
}: Args = {}): Promise<Payload> {
  if (cached.client) {
    return cached.client
  }

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing')
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: 'onboarding@resend.dev',
        fromName: 'DigitalHippo',
      },
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
