const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
  },
];

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
  },
  mode: 'development',
  module: { rules },
  performance:
    process.env.MODE === 'development'
      ? {
          hints: false,
        }
      : {},
  plugins: [
    new HTMLPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      containers: path.resolve(__dirname, './src/containers'),
      helpers: path.resolve(__dirname, './src/helpers/'),
      services: path.resolve(__dirname, './src/services/'),
      widgets: path.resolve(__dirname, './src/widgets/'),
    },
  },
};
