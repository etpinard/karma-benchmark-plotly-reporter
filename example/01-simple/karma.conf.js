var credentials = require('./.credentials.json')

module.exports = function (config) {
  config.set({
    frameworks: ['benchmark'],
    files: ['bench.js'],
    reporters: ['benchmark', 'benchmark-plotly'],

    // options for 'karma-benchmark-plotly-reporter'
    benchmarkPlotlyReporter: {
      username: credentials.username,
      apiKey: credentials.apiKey,
      cloudFilename: 'benchmark/one',
      imageFilename: 'one.png'
    },

    basePath: '.',
    browsers: ['Chrome'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    logLevel: config.LOG_INFO
  })
}
