import Express from 'express'
import serverless from 'serverless-http'

const app = Express()

app.get('/', (req, res) => {
  return res.json({
    message: 'Go Serverless v3.0! Your function executed successfully!',
  })
})

app.get('/health', (req, res) => {
  return res.status(200).json({})
})

export const handler = serverless(app)
