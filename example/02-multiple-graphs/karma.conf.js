var credentials = require('./.credentials.json')
var makeFigureDflt = require('karma-benchmark-plotly-reporter/make_figure')

module.exports = function (config) {
  config.set({
    frameworks: ['benchmark'],
    files: ['bench.js'],
    reporters: ['benchmark', 'benchmark-plotly'],

    // options for 'karma-benchmark-plotly-reporter'
    benchmarkPlotlyReporter: {
      username: credentials.username,
      apiKey: credentials.apiKey,
      makeFigure: makeFigure,
      cloudFilename: ['benchmark/iteration', 'benchmark/fill'],
      imageFilename: ['results-iteration.png', 'results-fill.png']
    },

    basePath: '.',
    browsers: ['Chrome', 'Firefox'],
    port: 9877,
    colors: true,
    autoWatch: false,
    singleRun: true,
    logLevel: config.LOG_INFO
  })
}

function makeFigure (results) {
  var iterationResults = results.filter(function (r) {
    return r.suite === 'Array iteration'
  })

  var fillResults = results.filter(function (r) {
    return r.suite === 'Array fill'
  })

  return [
    makeFigureDflt(iterationResults),
    makeFigureDflt(fillResults)
  ]
}
