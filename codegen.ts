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
  generates: {
    'packages/generated/front/src/index.ts': {
      documents: 'packages/apps/front/pages/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    'packages/generated/back/src/document.ts': {
      documents: 'packages/domains/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        // rawRequest: true,
      },
    },
  },
}

export default config
