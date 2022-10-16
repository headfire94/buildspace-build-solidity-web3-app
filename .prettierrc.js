module.exports = {
    trailingComma: 'none',
    singleQuote: true,
    plugins: [require('prettier-plugin-solidity')],
    overrides: [
        {
            files: '**/*.ts',
            options: {parser: 'typescript'}
        },
        {
            files: 'contracts/*.sol',
            options: {
                printWidth: 80,
                tabWidth: 4,
                useTabs: false,
                singleQuote: false,
                bracketSpacing: false
            }
        }
    ]
};
