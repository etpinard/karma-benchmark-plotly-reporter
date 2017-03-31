var credentials = require('./.credentials.json')

module.exports = function (config) {
  config.set({
    frameworks: ['benchmark'],
    files: ['bench.js'],
    reporters: ['benchmark', 'benchmark-json', 'benchmark-plotly'],

    // options for 'karma-benchmark-json-reporter'
    benchmarkJsonReporter: {
      pathToJson: 'benchmarks.json',
      formatOutput: formatOutput
    },

    // options for 'karma-benchmark-plotly-reporter'
    benchmarkPlotlyReporter: {
      username: credentials.username,
      apiKey: credentials.apiKey,

      cloudFilename: 'benchmark/benchmarks',

      // don't generate image
      imageFilename: null
    },

    basePath: '.',
    browsers: ['Firefox'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    logLevel: config.LOG_INFO
  })
}

function formatOutput (results) {
  return {
    meta: { url: 'https://plot.ly/~etpinard/7455' },
    results: results
  }
}
