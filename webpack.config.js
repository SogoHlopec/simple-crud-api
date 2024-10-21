import path from 'path';
const __dirname = import.meta.dirname;

export default {
    entry: './src/index.ts',
    mode: 'production',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    experiments: {
        outputModule: true,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module',
        },
    },
};
