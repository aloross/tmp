import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import glob from 'glob'

const config = {
  input: glob.sync('src/**/index.ts'),
  output: {
    dir: 'dist/',
    format: 'cjs',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    typescript({ exclude: ['**/*.stories.tsx'] }),
    postcss({
      autoModules: true,
    }),
  ],
}

export default config
