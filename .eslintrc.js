module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    rules: {
        'func-names': 0
    },
    extends: ['airbnb'],
    parserOptions: { ecmaVersion: 8 },
};
