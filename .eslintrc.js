module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': [2, 4, { 'SwitchCase': 1 }]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    overrides: [
        {
          files: ['**/__tests__/*.{j,t}s?(x)'],
          env: {
            mocha: true
          }
        }
    ]
}
