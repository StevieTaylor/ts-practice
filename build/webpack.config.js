const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 文件的入口
  entry: './src/index.ts',
  // 文件的出口
  output: {
    filename: 'main.js'
  },
  resolve: {
    // 处理后缀名为js、ts、tsx的扩展
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    // 指定打包的工具，每个模块都有对应的打包工具
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    // 本地开发环境基于哪个文件夹
    contentBase: './dist',
    // 控制台打印信息
    stats: 'errors-only', // 只打印错误信息
    compress: false,
    host: 'localhost',
    port: '1229'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
};
