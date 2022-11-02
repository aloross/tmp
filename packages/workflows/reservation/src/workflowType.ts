import { z } from 'zod'
import { GreetSchema } from './activities'


export const ExampleSchema = z.object({
  name: GreetSchema,
})

export type ExampleParams = z.infer<typeof ExampleSchema>
