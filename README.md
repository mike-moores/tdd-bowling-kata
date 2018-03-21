# JavaScript Bowling Kata

This kata aims to help you become familiar with test-first design, also commonly called test-driven development, or TDD. We prefer test-first design, since design of the code can often be a more important benefit from applying this approach. You should also find complexity is _much_ easier to manage. Considered together, if you end up with a solid design, manageable complexity and automated test coverage, not applying these practices is just asking for pain (short term and long term).

## Setup

Clone down the repository and run `yarn` to install dependencies.


## Test 1: Test setup

This is just to make sure our setup is working. Create `tests/index.test.js` with these contents.

```js
test('test setup working', function () {
  expect(true).toBeTruthy()
})
```

Run tests on the command line with `yarn test` and smile if you're getting a passing test. If so, commit it.

```shell
git add -A
git commit -m "Test setup working"
```


## Test 2: Gutterball frames

This is to make sure we can begin testing actual code and our most simple frame.

At the top of `tests/index.test.js`, add a reference to the code we intend to test.

```js
const game = require('../game') // this is the line to add
```

Now you'll notice you are getting an error because it can't find the `game` reference (because it doesn't exist yet). So let's add a `./game.js` file with the least amount of code.

```js
module.exports = {}
```

Now that our single test is passing again, let's add a test for returning the score of a gutterball frame.

```js
test('scores a gutterball frame', function () {
  const frame = [0, 0]
  const expected = 0
  const actual = game.scoreFrame(frame)
  expect(actual).toBe(expected)
})
```

Now our test is failing because it can't find the `scoreFrame()` method. So let's add it.

```js
module.exports = {
  scoreFrame: scoreFrame
}

function scoreFrame (frame) {
}
```

Now our test is failing because it returned the wrong value (`undefined`) instead of what it was expecting (`0`). So let's return what it wants.

```js
function scoreFrame (frame) {
  return 0
}
```

Sweet! Our tests are passing again. Let's commit it.

```shell
git add -A
git commit -m "Scoring gutterball frames"
```


## Test 3: Normal frames

Now let's add a feature that can score a normal frame (one without a spare or a strike).

```js
test('scores a normal frame', function () {
  const frame = [2, 3]
  const expected = 5
  const actual = game.scoreFrame(frame)
  expect(actual).toBe(expected)
})
```

This new test is failing because we were expecting a `5` and `0` was returned. Apparently our `scoreFrame` method needs to do something more than just `return 0`.

```js
function scoreFrame (frame) {
  //?
}
```

Complete the `scoreFrame` function to pass the test. High 5! But remember, the cycle is RED -> GREEN -> REFACTOR. Is there anything about your code that you could improve to make it more readable or DRY?

Don't forget to commit your changes:

```shell
git add -A
git commit -m "Scoring normal frames"
```


## Test 4: Spare frames

Now let's add a test for scoring a spare. To do this, we're going to need the next frame as well. You'll need to pass two arguments to `scoreFrame()`.

```js
test('scores a spare frame', function () {
})
```

Can you refactor your code? What could be improved? Remember to run the tests again after you've tidied up, just to make sure you didn't break anything. Now do a commit!


## Test 5: Single strike frames

Now let's add a feature for scoring a strike frame. Because a strike uses the next 2 rolls, if the first is another strike (called a double), we'll need yet another frame. Let's tackle the double scenario later. For now, let's handle the single-strike scenario.

```js
test('scores a single strike frame', function () {
})
```

How's the code looking? Anything need refactoring? Make your changes, then commit them.


## Test 6: Double strike frames

Now let's implement that other strike scenario where we have 2 strikes in a row and need a third frame. First, a new test.

```js
test('scores a double strike frame', function () {
})
```

Once again, look for opportunities to refactor. Do you have a `scoreStrikes()` function? Maybe `isStrike()` and `isSpare()` would be useful too. Run the tests and make sure they still pass. Cool, let's commit it.


## Test 7: Scores the frames of a game

Now that we can score many types of frames, let's add a feature to score a whole game of 10 frames. Because the 10th frame has special behaviour if there is a strike or a spare in it, we'll leave that scenario out of this test and test it separately later. But we can still add normal, spare, single strike and double strike frames.

```js
test('scores a game', function () {
})
```

Pass your test, check to see if you can refactor anything, and do a commit.


## Test 8: Scores a game with a strike or spare in the 10th

Now let's add a feature that calculates the 10th frame when it contains a strike or a spare. You guessed it, a test first.

```js
test('scores a spare in the 10th frame', function () {
})
```

Maybe you could create an `isTenth` variable and pass it to `scoreFrame()`?


## STRETCH: Create a client to consume the game module

Name it `index.js` so you can run it with `yarn start`.
