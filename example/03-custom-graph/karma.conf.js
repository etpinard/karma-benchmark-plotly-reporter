var credentials = require('./.credentials.json')
var makeFigureDflt = require('karma-benchmark-plotly-reporter/lib/make_figure')

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

      // don't generate graph on cloud
      cloudFilename: null,

      // save image as SVG
      imageFilename: 'benchmarks.svg'
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

function makeFigure (results) {
  var fig = makeFigureDflt(results)

  // adjust colors
  fig.data.forEach(function (t) {
    t.marker = {
      color: '#d3d3d3',
      line: {
        color: 'black',
        width: 2
      }
    }
  })

  // change x-axis title
  fig.layout.xaxis.title = 'ops/sec'

  // adjust output width/height
  fig.layout.width = 1000
  fig.layout.height = 800

  return fig
}
