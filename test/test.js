var tap = require('tap')
var Mock = require('./mock')

tap.test('should throw errors on invalid input', function (t) {
  function fn (username, apiKey) {
    return function () {
      Mock.mockReporter({
        benchmarkPlotlyReporter: {
          username: username,
          apiKey: apiKey
        }
      })
    }
  }

  var err = 'Must provide plotly cloud username and api key!'

  t.throws(fn(undefined, undefined), err)
  t.throws(fn(null, ''), err)
  t.throws(fn('hello', ''), err)
  t.throws(fn('', 'dsadfdasg'), err)

  t.end()
})

tap.test('should coerce *cloudFilename*', function (t) {
  function coerce (cloudFilename) {
    var config = Mock.mockConfig({ cloudFilename: cloudFilename })
    var reporter = Mock.mockReporter(config)

    reporter.onRunComplete()

    return reporter.__plotArgs.map(function (a) {
      return a[1].filename
    })
  }

  t.test('non strings and empty strings to null', function (t) {
    [undefined, null, false, {}, ''].forEach(function (v) {
      var out = coerce(v)
      t.same(out, [])
    })

    t.end()
  })

  t.test('by honoring string values', function (t) {
    var out = coerce('one')

    t.same(out, ['one'])
    t.end()
  })

  t.end()
})

tap.test('should coerce *imageFilename*', function (t) {
  function coerce (imageFilename, basePath) {
    var opts = { imageFilename: imageFilename }
    var config = Mock.mockConfig(opts, basePath)
    var reporter = Mock.mockReporter(config)

    reporter.onRunComplete()

    return reporter.__getImageArgs.map(function (a) {
      return a[1].filename
    })
  }

  t.test('non strings and empty strings to null', function (t) {
    [undefined, null, false, {}, ''].forEach(function (v) {
      var out = coerce(v)
      t.same(out, [])
    })

    t.end()
  })

  t.test('by honoring string values', function (t) {
    var out = coerce('one.json')

    t.same(out, ['one.json'])
    t.end()
  })

  t.test('by honoring string values with set *basePath*', function (t) {
    var out = coerce('one.json', 'example')

    t.same(out, ['example/one.json'])
    t.end()
  })

  t.test('by honoring absolute paths', function (t) {
    var out = coerce('/home/one.json', 'example')

    t.same(out, ['/home/one.json'])
    t.end()
  })

  t.end()
})

tap.test('makeFigure', function (t) {
  var config = Mock.mockConfig({
    cloudFilename: 'cloud',
    imageFilename: 'img.png'
  })
  var reporter = Mock.mockReporter(config)

  // N.B. results are sorted using the hz field
  var specs = [
    ['Chrome', 'one', 'a', 1, { mean: 0.1, sample: [0.1, 0.2, 0.3] }],
    ['Chrome', 'one', 'b', 2, { mean: 0.3, sample: [10, 20, 30] }],
    ['FF', 'one', 'a', 3, { mean: 0.22, sample: [1, 20, 30] }],
    ['FF', 'one', 'b', 4, { mean: 0.99, sample: [10, 2, 3] }],
    ['Chrome', 'two', 'x', 5, { mean: 1, sample: [1, 2, 20] }],
    ['Chrome', 'two', 'y', 6, { mean: 1.1, sample: [1, 5, 3] }],
    ['FF', 'two', 'z', 7, { mean: 0.03, sample: [1, 2, 10] }],
    ['FF', 'two', 'y', 8, { mean: 0.02, sample: [0.1, 2, 1] }]
  ].reverse()

  specs.forEach(reporter.__bench)
  reporter.onRunComplete()

  t.equal(reporter.__plotArgs.length, 1)
  t.equal(reporter.__getImageArgs.length, 1)

  var data = reporter.__plotArgs[0][0]
  var graphOpts = reporter.__plotArgs[0][1]
  var fig = reporter.__getImageArgs[0][0]
  var imageOpts = reporter.__getImageArgs[0][1]

  t.equal(graphOpts.filename, 'cloud')
  t.equal(graphOpts.fileopt, 'overwrite')

  t.equal(imageOpts.format, 'png')
  t.equal(imageOpts.width, 600)
  t.equal(imageOpts.height, 700)

  var _data = [data, fig.data]

  _data.forEach(function (o) {
    t.equal(o.length, 1)
    t.same(o[0].x, [8, 7, 6, 5, 4, 3, 2, 1])
    t.same(o[0].y, [
      'two<br>y<br>FF',
      'two<br>z<br>FF',
      'two<br>y<br>Chrome',
      'two<br>x<br>Chrome',
      'one<br>b<br>FF',
      'one<br>a<br>FF',
      'one<br>b<br>Chrome',
      'one<br>a<br>Chrome'
    ])
    t.same(o[0].text, [
      'Suite: two<br>Run: y<br>Browser: FF',
      'Suite: two<br>Run: z<br>Browser: FF',
      'Suite: two<br>Run: y<br>Browser: Chrome',
      'Suite: two<br>Run: x<br>Browser: Chrome',
      'Suite: one<br>Run: b<br>Browser: FF',
      'Suite: one<br>Run: a<br>Browser: FF',
      'Suite: one<br>Run: b<br>Browser: Chrome',
      'Suite: one<br>Run: a<br>Browser: Chrome'
    ])
    t.same(o[0].error_x.array, [
      5.838985357063331,
      0.5567764362830022,
      0.5307227776030219,
      0.5709093623334618,
      0.2768874620972692,
      0.5959061727039473,
      0.051031036307982884,
      5.103103630798286
    ])
  })

  var _layout = [graphOpts.layout, fig.layout]

  _layout.forEach(function (o) {
    t.equal(o.xaxis.title, 'Operations per second')
    t.equal(o.margin.l, 104)
  })

  t.end()
})
