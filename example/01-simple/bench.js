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
