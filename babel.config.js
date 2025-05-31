export default {
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' },
      bugfixes: true
    }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['@babel/plugin-proposal-private-methods', { loose: false }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: false }]
  ]
};