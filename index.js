var fs = require('fs')
var path = require('path')
var Plotly = require('plotly')

var fillResultSet = require('karma-benchmark-json-reporter/lib/fill_result_set')
var compileResults = require('karma-benchmark-json-reporter/lib/compile_results')
var makeFigure = require('./make_figure')

var BenchReporter = function (baseReporterDecorator, config) {
  baseReporterDecorator(this)

  this._key = 'benchmarkPlotlyReporter'

  var pending = 0
  var next = function () {}

  var opts = config[this._key] || {}

  if (!isNonEmptyString(opts.username) || !isNonEmptyString(opts.apiKey)) {
    throw new Error('Must provide plotly cloud username and api key!')
  }

  var plotly = this._plotly = Plotly(opts.username, opts.apiKey)

  var _makeFigure = isFunction(opts.makeFigure)
    ? opts.makeFigure
    : makeFigure

  var cloudFilenames = coerceCloudFilename(config, opts)
  var imageFilenames = coerceImageFilename(config, opts)

  var resultSet = {}

  this.specSuccess = function (browser, result) {
    fillResultSet(resultSet, browser, result)
  }

  this.onRunComplete = function () {
    var reporter = this
    var results = compileResults(resultSet)
    var figures = coerceToArray(_makeFigure(results))

    figures.forEach(function (fig, i) {
      var cloudFn = cloudFilenames[i]
      var imageFn = imageFilenames[i]

      if (cloudFn !== null) {
        var graphOpts = {}
        graphOpts.layout = fig.layout
        graphOpts.filename = cloudFn
        graphOpts.fileopt = 'overwrite'

        pending++
        plotly.plot(fig.data, graphOpts, function (err, msg) {
          if (err) throw err

          reporter.write('See results online at:', msg.url, '\n')
          if (!--pending) next()
        })
      }

      if (imageFn !== null) {
        var imageOpts = {}
        imageOpts.filename = imageFn
        imageOpts.format = path.extname(imageFn).substr(1)
        imageOpts.width = fig.layout.width || 600
        imageOpts.height = fig.layout.height || 700

        pending++
        plotly.getImage(fig, imageOpts, function (err, imageStream) {
          if (err) throw err

          imageStream
            .pipe(fs.createWriteStream(imageFn))
            .on('finish', function () {
              reporter.write('Wrote image ' + path.basename(imageFn) + '\n')
              if (!--pending) next()
            })
        })
      }
    })
  }

  this.onExit = function (done) {
    if (pending) next = done
    else done()
  }
}

function coerceCloudFilename (config, opts) {
  return coerceToArray(opts.cloudFilename).map(function (p) {
    if (isNonEmptyString(p)) return p
    else return null
  })
}

function coerceImageFilename (config, opts) {
  return coerceToArray(opts.imageFilename).map(function (p) {
    if (isNonEmptyString(p)) {
      if (path.isAbsolute(p)) return p
      else return path.join(config.basePath, p)
    } else {
      return null
    }
  })
}

function coerceToArray (input) {
  return Array.isArray(input) ? input : [input]
}

function isFunction (d) {
  return typeof d === 'function'
}

function isNonEmptyString (d) {
  var WHITESPACE = /s/g
  return typeof d === 'string' && d.replace(WHITESPACE, '') !== ''
}

BenchReporter.$inject = ['baseReporterDecorator', 'config']

module.exports = {
  'reporter:benchmark-plotly': ['type', BenchReporter]
}
