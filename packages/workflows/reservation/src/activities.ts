import { z } from 'zod'

export const GreetSchema = z.string()

export type GreetParams = z.infer<typeof GreetSchema>

export async function greet(name: GreetParams): Promise<string> {
  return `Hello, ${name}!`
}
