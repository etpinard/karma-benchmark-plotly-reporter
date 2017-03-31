function makeFigure (results) {
  var trace = {
    type: 'bar',
    orientation: 'h',
    hoverinfo: 'x+text',
    y: [],
    x: [],
    text: [],
    error_x: { array: [] }
  }

  var longestLabel = 0

  results.forEach(function (r) {
    trace.y.push([r.suite, r.name, r.browser].join('<br>'))
    trace.x.push(r.hz)
    trace.error_x.array.push(r.hzDeviation)
    trace.text.push([
      'Suite: ' + r.suite, 'Run: ' + r.name, 'Browser: ' + r.browser
    ].join('<br>'))

    longestLabel = Math.max(longestLabel,
      r.suite.length, r.name.length, r.browser.length
    )
  })

  return {
    data: [trace],
    layout: {
      margin: {
        l: 80 + 4 * longestLabel
      },
      yaxis: {
        autorange: 'reversed',
        ticks: 'outside',
        ticklen: 8,
        tickcolor: 'rgba(0,0,0,0)'
      },
      xaxis: {
        title: 'Operations per second'
      }
    }
  }
}

module.exports = makeFigure
