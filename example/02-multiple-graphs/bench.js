/* global suite, benchmark  */

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

suite('Array fill', function () {
  var N = 1000

  benchmark('[] + push', function () {
    var arr = []

    for (var i = 0; i < N; i++) {
      arr.push(Math.random())
    }
  })

  benchmark('new Array + indexing', function () {
    var arr = new Array(N)

    for (var i = 0; i < N; i++) {
      arr[i] = Math.random()
    }
  })
})
