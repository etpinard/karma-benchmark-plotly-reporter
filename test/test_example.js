var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
var sizeOf = require('image-size')
var tap = require('tap')

var PATH_TO_EXAMPLE = path.join(__dirname, '..', 'example')
var CI = !!process.env.CI

function run (dirName, cb) {
  var cmd = 'npm run clean && npm start -- --browsers Firefox'
  var cwd = path.join(PATH_TO_EXAMPLE, dirName)

  exec('npm install', { cwd: cwd }, function (err) {
    if (err) throw err

    setTimeout(function () {
      exec(cmd, { cwd: cwd }, function (err, msg) {
        if (err) throw err
        cb(cwd, msg)
      })
      .stdout.pipe(process.stdout)
    }, 2000)
  })
  .stdout.pipe(process.stdout)
}

function getSize (cwd, fileName) {
  var pathToFile = path.join(cwd, fileName)
  var s = sizeOf(pathToFile)
  return [s.width, s.height]
}

function read (cwd, fileName) {
  var pathToFile = path.join(cwd, fileName)
  return JSON.parse(fs.readFileSync(pathToFile, 'utf-8'))
}

function assertMsg (t, msg, requiredContent) {
  var lines = msg
    .split('\n')
    .reverse()
    .slice(0, requiredContent.length + 1)

  var ok = requiredContent.every(function (c) {
    return lines.indexOf(c) !== -1
  })

  t.ok(ok, lines)
}

tap.test('should return correct image - simple case', { skip: CI }, function (t) {
  run('01-simple', function (cwd, msg) {
    t.same(getSize(cwd, 'one.png'), [600, 700])

    assertMsg(t, msg, [
      'Wrote image one.png',
      'See results online at: https://plot.ly/~etpinard/7443 '
    ])

    t.end()
  })
})

tap.test('should return correct images - multiple output files case', { skip: CI }, function (t) {
  run('02-multiple-graphs', function (cwd, msg) {
    t.same(getSize(cwd, 'results-fill.png'), [600, 700])
    t.same(getSize(cwd, 'results-iteration.png'), [600, 700])

    assertMsg(t, msg, [
      'Wrote image results-fill.png',
      'Wrote image results-iteration.png',
      'See results online at: https://plot.ly/~etpinard/7451 ',
      'See results online at: https://plot.ly/~etpinard/7452 '
    ])

    t.end()
  })
})

tap.test('should return correct image - custom graph case', { skip: CI }, function (t) {
  run('03-custom-graph', function (cwd, msg) {
    t.same(getSize(cwd, 'benchmarks.svg'), [1000, 800])

    assertMsg(t, msg, [
      'Wrote image benchmarks.svg'
    ])

    t.end()
  })
})

tap.test('should return correct JSON - with json reporter case', { skip: CI }, function (t) {
  run('04-with-json-reporter', function (cwd, msg) {
    var r = read(cwd, 'benchmarks.json')

    t.equal(r.meta.url, 'https://plot.ly/~etpinard/7455')
    t.equal(r.results.length, 2)

    assertMsg(t, msg, [
      'See results online at: https://plot.ly/~etpinard/7455 '
    ])

    t.end()
  })
})
