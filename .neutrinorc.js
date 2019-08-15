module.exports = {
  options: {
    output: 'lib'
  },
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/library',
      {
        name: 'barejs-observable-graphql-client',
        target: 'web'
      }
    ]
  ]
};
