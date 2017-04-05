var fs = require('fs')
var path = require('path')

var PATH_TO_EXAMPLE = path.join(__dirname, '..', 'example')
var PLOTLY_USERNAME = process.env.PLOTLY_USERNAME
var PLOTLY_APIKEY = process.env.PLOTLY_APIKEY

fs.readdir(PATH_TO_EXAMPLE, function (err, dirs) {
  if (err) throw err

  dirs.forEach(function (d) {
    var karmaConf = path.join(PATH_TO_EXAMPLE, d, 'karma.conf.js')

    if (!doesFileExist(karmaConf)) {
      var content = JSON.stringify({
        username: PLOTLY_USERNAME,
        apiKey: PLOTLY_APIKEY
      }, 2, null)

      fs.writeFile(karmaConf, content, function (err) {
        if (err) throw err
        console.log('wrote', karmaConf)
      })
    }
  })
})

function doesFileExist (filePath) {
  try {
    if (fs.statSync(filePath).isFile()) return true
  } catch (e) {}

  return false
}
