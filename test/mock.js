var BenchReporter = require('../')['reporter:benchmark-plotly'][1]
var makeFigureDflt = require('../make_figure')
var NOOP = function () {}

exports.mockReporter = function (config) {
  var reporter = new BenchReporter(NOOP, config)

  // mock plotly.plot method
  reporter.__plotArgs = []
  reporter._plotly.plot = function (data, graphOpts) {
    reporter.__plotArgs.push([data, graphOpts])
  }

  // mock plotly.getImage method
  reporter.__getImageArgs = []
  reporter._plotly.getImage = function (fig, imageOpts) {
    reporter.__getImageArgs.push([fig, imageOpts])
  }

  // shortcut to call 'specSuccess' to fill in results
  reporter.__bench = function (_) {
    var browserArg = exports.mockBrowserArg(_[0])
    var resultArg = exports.mockResultArg(_[1], _[2], _[3], _[4])

    reporter.specSuccess(browserArg, resultArg)
  }

  reporter.__makeFigureDflt = makeFigureDflt

  return reporter
}

exports.mockConfig = function (opts, basePath) {
  opts = opts || {}
  opts.username = opts.username || 'fake-user'
  opts.apiKey = opts.apiKey || 'fake-api-key'

  return {
    basePath: basePath || '.',
    benchmarkPlotlyReporter: opts
  }
}

exports.mockBrowserArg = function (browserName) {
  return {
    name: browserName
  }
}

// N.B. results are sorted using the hz field
exports.mockResultArg = function (suiteName, benchmarkName, hz, stats) {
  return {
    benchmark: {
      suite: suiteName,
      name: benchmarkName,
      hz: hz,
      stats: stats
    }
  }
}
