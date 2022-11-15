import { createLogger } from 'bunyan'

export const getLogger = (name: string) => createLogger({
  name,
})
