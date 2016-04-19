JavaScript Bowling Kata
============================

## Setup

```shell
cd my-favourite-folder
mkdir bowling-kata
cd bowling-kata
git init .
echo "4.4" > .nvmrc # if you're using nvm
npm init # test command: tape 'tests/**/*.js'
npm install tape --save-dev
```

## First test

```shell
mkdir tests
```

Create `tests/index.js` with these contents:
```js
var test = require('tape')

test('first', function(t) {
  t.equal(1, 1)
  t.end()
})
```

Run tests on the command line with `npm test`

