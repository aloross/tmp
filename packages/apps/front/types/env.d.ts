export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      HASURA_PROJECT_ENDPOINT: string
      HASURA_ADMIN_SECRET: string
    }
  }
}
