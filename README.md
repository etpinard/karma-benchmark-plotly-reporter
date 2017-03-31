# karma-benchmark-plotly-reporter

[![npm version][badge-version]][npm]

[![Build Status][badge-travis]][travis]
[![Coverage Status][badge-coveralls]][coveralls]

[![Dependency Status][badge-deps]][deps]
[![devDependency Status][badge-dev-deps]][dev-deps]
[![Greenkeeper badge][badge-greenkeeper]][greenkeeper]

A reporter for [karma-benchmark][karma-benchmark] visualising results as plotly
graphs.

## Install

```bash
npm install karma-benchmark-plotly-reporter
```

## Setting up

After installing `karma`, [karma-benchmark][karma-benchmark] and your favorite
launcher, in your `karma.conf.js`:

```js
module.exports = function (config) {
  config.set({
    frameworks: ['benchmark'],
    reporters: ['benchmark-plotly'],

    files: ['bench.js'],
    browsers: ['Chrome'],

    // options for 'karma-benchmark-plotly-reporter'
    benchmarkPlotlyReporter: {
      username: 'plot.ly user name (required)',
      apiKey: 'plot.ly API key (required)'
    }
  })
}
```

then given this suite in `bench.js`:

```js
suite('Array iteration', function () {
  benchmark('for-loop', function () {
    var arr = [1, 2, 3]
    var arr2 = []

    for (var i = 0; i < arr.length; i++) {
      arr2.push(arr[i] + 1)
    }
  })

  benchmark('forEach', function () {
    var arr = [1, 2, 3]
    var arr2 = []

    arr.forEach(function (el) {
      arr2.push(el + 1)
    })
  })
})
```

we get

[![Example graph][example-graph-png]][example-graph-url]

----

See complete working [examples][example] for more details.

## API

The `benchmarkPlotlyReporter` option container has five settings:

### `username`

**Required!** Plotly cloud user name. Sign up for free at
[plot.ly](https://plot.ly/).

### `apiKey`

**Required!** Plotly cloud API key. Copy it from
[plot.ly/settings/api](https://plot.ly/settings/api).

### `makeFigure`

Function that takes in the compiled results array and is expected to return an
`"data"` / `"layout"` object filled with plotly options. For the complete list
of available data and layout options, go to
[plot.ly/javascript/reference](https://plot.ly/javascript/reference/)

The compiled results are presented in the same way for the
`karma-benchmark-json-reporter`. See
[docs](https://github.com/etpinard/karma-benchmark-json-reporter#formatresults).

Default: see the default `makeFigure` function in `lib/make_figure.js`.

If `makeFigure` returns an array of `"data"` / `"layout"` objects, then multiple
graphs will be generated. See this [example][example-02] for more.

### `cloudFilename`

String or array of string (in the multiple graph case) corresponding to the file
name by which the graph(s) will be saved on your plotly cloud account. Note that
graphs of the same name will be overwritten.

If set to an empty string or another type, no graphs will be generated in the
cloud. This is useful when only desiring an image representation.

Default: `null`

### `imageFilename`

String or array of string (in the multiple graph case) corresponding to the file
to the path(s) from the karma `basePath` where the image(s) will be saved.

As with `cloudFilename`, if set to an empty string or another type, no image
will be generated This is useful when only desiring a graph on the cloud.

Default: `null`


## Credits

2017 Étienne Tétreault-Pinard. MIT License

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[npm]: https://www.npmjs.com/package/karma-benchmark-plotly-reporter
[badge-version]: https://badge.fury.io/js/karma-benchmark-plotly-reporter.svg
[travis]: https://travis-ci.org/etpinard/karma-benchmark-plotly-reporter
[badge-travis]: https://travis-ci.org/etpinard/karma-benchmark-plotly-reporter.svg?branch=master
[coveralls]: https://coveralls.io/github/etpinard/karma-benchmark-plotly-reporter?branch=master
[badge-coveralls]: https://coveralls.io/repos/github/etpinard/karma-benchmark-plotly-reporter/badge.svg?branch=master
[badge-deps]: https://david-dm.org/etpinard/karma-benchmark-plotly-reporter.svg?style=flat-square
[deps]: https://david-dm.org/etpinard/karma-benchmark-plotly-reporter
[badge-dev-deps]: https://david-dm.org/etpinard/karma-benchmark-plotly-reporter/dev-status.svg?style=flat-square
[dev-deps]: https://david-dm.org/etpinard/karma-benchmark-plotly-reporter#info=devDependencies
[greenkeeper]: https://greenkeeper.io/
[badge-greenkeeper]: https://badges.greenkeeper.io/etpinard/karma-benchmark-plotly-reporter.svg
[karma-benchmark]: https://github.com/JamieMason/karma-benchmark
[example]: https://github.com/etpinard/karma-benchmark-plotly-reporter/tree/master/example
[example-02]: https://github.com/etpinard/karma-benchmark-plotly-reporter/tree/master/example/02-multiple-graphs
[example-graph-png]: https://plot.ly/~etpinard/7443.png
[example-graph-url]: https://plot.ly/~etpinard/7443
