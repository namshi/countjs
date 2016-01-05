# CountJS

[![Build Status](https://travis-ci.org/namshi/countjs.svg?branch=master)](https://travis-ci.org/namshi/countjs)

> Count items and compare them against a reference

## Installation

Simply install it via NPM (`npm install countjs`) and `require` it
in your code:

``` javascript
var Counter = require('countjs')

var c = new Counter()
```

## Usage

`countjs` is relatively simple -- just instantiate a counter and keep
adding stuff to it:

``` javascript
var c = new Counter()

c.add('a')
c.add('a')
c.add('b')
```

Then you can get how many items are there in the counter:

``` javascript
c.get('a') // 2
c.get('b') // 1
c.get() // {a: 2, b: 1}
```

You can also specify a custom quantity to add:

``` javascript
c.add('a', {qty: 3}) // 2
c.get('a') // 3
```

And create a diff between counters:

``` javascript
var c1 = new Counter({a: 1})
var c2 = new Counter({b: 1})

c1.diff(c2) // {a: 1, b: 0}
```

You can also use "references": if an item has qty `X`
in the reference, then your counter will not be able to
add more than `X` qty of that item:

``` javascript
var ref = {a: 1, b: 2}
var c = new Counter({}, ref)

c.add('a') // true
c.add('a') // false
c.add('b', {qty: 3}) // false
c.add('b', {qty: 2}) // true
c.add('c') // false

c.get() // {a: 1, b: 2}
```

You can force the counter to accept the new value:

``` javascript
var ref = {a: 1}
var c = new Counter({}, ref)

c.add('a') // true
c.add('a') // false
c.add('a', {qty: 1, force: true}) // true
c.get() // {a: 2}
```

When using references, you can get a diff between the current
counter and the reference. For example:

``` javascript
var ref = {a: 1}
var c = new Counter({}, ref)

c.add('a', {qty: 2, force: true}) // true
c.add('b', {qty: 3, force: true}) // true

c.diff() // {a: {mine: 2, other: 1, diff: 1}, b: {mine: 3, other: 0, diff: 3}}
```

Last but not least, you can get a full comparison between counters:

``` javascript
var c1 = new Counter({a: 1, b: 1, d: 3})
var c2 = new Counter({b: 2, c: 1, d: 3})

comparison = c1.compare(c2)
// {
//  a: mine 1, other 0
//  b: mine 1, other 2
//  c: mine 0, other 1
//  d: mine 3, other 3
// }
```

`compare` is, basically, a `#diff()` that also includes same values
between counters.

## Tests

Just run `npm test` and welcome to [Greenland](https://travis-ci.org/namshi/countjs.svg?branch=master)!
