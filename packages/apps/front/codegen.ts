import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://manager.preprod.thefork.com/api/graphql',
  documents: 'app/**/*.tsx',
  ignoreNoDocuments: true,
  generates: {
    'gql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
