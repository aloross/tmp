import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://manager.preprod.thefork.com/api/graphql',
  documents: 'packages/apps/front/**/*.tsx',
  generates: {
    'packages/generated/src/index.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}

export default config
