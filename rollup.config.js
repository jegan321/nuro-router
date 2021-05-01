export default [
  {
    input: 'build/compiled/index.js',
    output: {
      file: 'build/dist/nuro-router.js',
      format: 'es'
    }
  },
  {
    input: 'build/compiled/index-umd.js',
    output: {
      file: 'build/dist/nuro-router.umd.js',
      format: 'umd',
      name: 'NuroRouter'
    }
  }
]
