### css

has and parent selector
https://twitter.com/smashingmag/status/1402588766070521857/photo/1


## typescript

module と namespaceの違い

## js

Arrayの使い方ためす
https://stackoverflow.com/questions/4852017/how-to-initialize-an-arrays-length-in-javascript

```
Array(5) gives you an array with length 5 but no values, hence you can't iterate over it.

Array.apply(null, Array(5)).map(function () {}) gives you an array with length 5 and undefined as values, now it can be iterated over.

Array.apply(null, Array(5)).map(function (x, i) { return i; }) gives you an array with length 5 and values 0,1,2,3,4.

Array(5).forEach(alert) does nothing, Array.apply(null, Array(5)).forEach(alert) gives you 5 alerts

ES6 gives us Array.from so now you can also use Array.from(Array(5)).forEach(alert)

If you want to initialize with a certain value, these are good to knows...
Array.from('abcde'), Array.from('x'.repeat(5))
or Array.from({length: 5}, (v, i) => i)   // gives [0, 1, 2, 3, 4]
```
