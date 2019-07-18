var path = require('path');

const ImageminPlugin = require("imagemin-webpack");

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.*assets\/.*\.(jpe?g|png|gif|svg)$/i,
        use: [ 'file-loader' ],
      },
      {
        test: /.*assets_lossless\/.*\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: ImageminPlugin.loader,
            options: {
              bail: false,
              imageminOptions: {
                plugins: [
                  ["jpegtran", { progressive: true }],
                  ["optipng", { optimizationLevel: 5 }],
                  ["gifsicle", { interlaced: true }],
                  "svgo"
                ]
              }
            }
          }
        ],
      },
      {
        test: /.*assets_lossy\/.*\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: ImageminPlugin.loader,
            options: {
              bail: false,
              imageminOptions: {
                plugins: [
                  ["mozjpeg", { quality: 80, progressive: true }],
                  ["pngquant", { strip: true, dithering: 0 }],
                  ["giflossy", { colors: 128, lossy: 300 }],
                  [
                    "svgo",
                    {
                      plugins: [
                        {
                          cleanupNumericValues: {
                            floatPrecision: 0
                          }
                        }
                      ]
                    }
                  ]
                ]
              }
            }
          },
        ],
      },
      {
        test: /.*assets_webp\/.*\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: ImageminPlugin.loader,
            options: {
              bail: false,
              imageminOptions: {
                plugins: [ "webp" ]
              }
            }
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
};
