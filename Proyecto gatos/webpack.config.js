const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
    mode: 'production',
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
  },
  entry: './src/js/all.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html',  
      filename: 'index.html',     
    }),
    new WebpackObfuscator ({
      rotateStringArray: true
  }, [])
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: [ 
            path.resolve(__dirname, '') 
        ],
        enforce: 'post',
        use: { 
            loader: WebpackObfuscator.loader, 
            options: {
                rotateStringArray: true
            }
        }
        
    }
    ],
  },
};