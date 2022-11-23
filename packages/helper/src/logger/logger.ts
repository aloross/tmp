import { createLogger } from 'bunyan'
import path from 'path'

export const getLogger = (name: string) => createLogger({
  name,
  streams: [{
    level: 'info',
    stream: process.stdout,
  }, {
    type: 'rotating-file',
    path: path.resolve(`../../../logs/${name}.log`),
    period: '1d',
    count: 3,
  }],
})
