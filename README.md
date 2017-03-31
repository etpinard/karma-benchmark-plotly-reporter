# karma-benchmark-json-reporter

[![npm version][badge-version]][npm]

[![Build Status][badge-travis]][travis]
[![Coverage Status][badge-coveralls]][coveralls]

[![Dependency Status][badge-deps]][deps]
[![devDependency Status][badge-dev-deps]][dev-deps]
[![Greenkeeper badge][badge-greenkeeper]][greenkeeper]

A reporter for [karma-benchmark][karma-benchmark] outputting results to a JSON
file.

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

    // other karma options

    // options for 'karma-benchmark-plotly-reporter'
    benchmarkPlotlyReporter: {
      // ...
    }
  })
}
```

See complete [examples][example].

## API

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
[example-02]: https://github.com/etpinard/karma-benchmark-plotly-reporter/blob/master/example/02-multiple-output-files/karma.conf.js
