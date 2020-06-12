const project = require('./project.json');

module.exports = {
  entry: `${__dirname}/${project.scripts.source.entry}`,
  output: {
    library: 'rasket',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: `${__dirname}/${project.scripts.dist.root}`
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  }
};
