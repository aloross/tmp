import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8081/v1/graphql',
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
