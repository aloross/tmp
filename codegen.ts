import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://manager.preprod.thefork.com/api/graphql',
  documents: 'packages/apps/front/app/**/*.tsx',
  generates: {
    'packages/generated/src/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
