import { createLogger } from 'bunyan'
import path from 'path'

export const getLogger = (name: string) => createLogger({
  name,
  streams: [{
    level: 'info',
    stream: process.stdout,
  }],
})
