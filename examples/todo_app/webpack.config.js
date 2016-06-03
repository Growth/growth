module.exports = {
    entry: './examples/todo_app/src/main.js',
    output: {
        path: './examples/todo_app/',
        filename: 'main.bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};
