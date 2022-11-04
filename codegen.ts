import type { CodegenConfig } from '@graphql-codegen/cli'

const { HASURA_GRAPHQL_ADMIN_SECRET } = process.env

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'http://localhost:8081/v1/graphql': {
      headers: {
        'X-Hasura-Admin-Secret': HASURA_GRAPHQL_ADMIN_SECRET as string,
      },
    },
  },
  documents: 'packages/apps/front/pages/**/*.graphql',
  generates: {
    'packages/generated/src/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}

export default config
