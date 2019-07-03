var path = require('path');

const ImageminPlugin = require("imagemin-webpack");
const imageminSvgo = require("imagemin-svgo");

// Lossy plugins
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminGifLossy = require("imagemin-gifsicle");

// Lossless plugins
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminGifsicle = require("imagemin-gifsicle");

module.exports = {
  mode: 'development',
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
                  imageminJpegtran(
                    {
                      progressive: true
                    }
                  ),
                  imageminOptipng(),
                  imageminGifsicle({
                    interlaced: true
                  }),
                  imageminSvgo()
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
                  imageminMozjpeg(
                    {
                      quality: 80,
                      progressive: true
                    }
                  ),
                  imageminPngquant({
                    strip: true,
                    dithering: 0,
                  }),
                  imageminGifLossy({
                    colors: 128,
                    lossy: 300,
                  }),
                  imageminSvgo()
                ]
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
