JavaScript Bowling Kata
============================

This kata aims to help the participant become familiar with test-first design, also commonly called test-driven development, or TDD. We prefer test-first design, since design of the code can oftem be a more important benefit from applying this approach. You should also find complexity is _much_ easier to manage. Considered together, if you end up with a solid design, manageable complexity and automated test coverage, not applying these practices is just asking for pain (short term and long term).

## Setup

You will need Node.js and NPM installed before getting started.

```shell
cd my-favourite-folder
mkdir bowling-kata
cd bowling-kata
git init .
echo "node_modules" > .gitignore
echo "4.4" > .nvmrc # if you're using nvm
npm init # test command: tape 'tests/**/*.js'
npm install tape --save-dev
git add .
git commit -m "Initial commit"
```

## Test 1: Test setup

This is just to make sure our setup is working.

```shell
mkdir tests
```

Create `tests/index.js` with these contents.
```js
var test = require('tape')

test('test setup working', function(t) {
  t.equal(1, 1)
  t.end()
})
```

Run tests on the command line with `npm test` and smile if you're getting a passing test. If so, commit it.
```shell
git add .
git commit -m "Test setup working"
```

## Test 2: Gutterball frames

This is to make sure we can begin testing actual code and our most simple frame.

In `tests/index.js`, add a reference to the code we intend to test.
```js
var test = require('tape')
var game = require('../game') // this is the line to add
```
If you run your tests now, you should get an error because it can't find the `game` reference (because it doesn't exist yet). So let's add a `./game.js` file with the least amount of code.
```js
module.exports = {}
```
Now that our single test is passing again, let's add a test for returning the score of a gutterball frame.
```js
test('scores a gutterball frame', function(t) {
  var frame = [0, 0]
  var score = game.scoreFrame(frame)
  t.equals(score, 0)
  t.end()
}
```
Now when we run our tests, it fails because it can't find the `scoreFrame()` method. So let's add it.
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
git add .
git commit -m "Scoring gutterball frames"
```

## Test 3: Normal frames

Now let's add a feature that can score a normal frame (one without a spare or a strike).
```js
test('scores a normal frame', function(t) {
  var frame = [2, 3]
  var score = game.scoreFrame(frame)
  t.equals(score, 5)
  t.end()
})
```
This new test is failing because we were expecting a `5` and `0` was returned. Apparently our `scoreFrame` method needs to do something more than just `return 0`.
```js
function scoreFrame (frame) {
  return frame[0] + frame[1]
}
```
Yay, passing tests again! Let's commit it.
```shell
git add .
git commit -m "Scoring normal frames"
```

## Test 4: Spare frames

Now let's add a test for scoring a spare. To do this, we're going to need the next frame as well.
```js
test('scores a spare frame', function(t) {
  var frame = [2, 8] // spare
  var nextFrame = [6, 3]
  var score = game.scoreFrame(frame, nextFrame)
  t.equals(score, 16)
  t.end()
})
```
Now our tests are failing because it's not taking into account the spare and the second frame. Let's fix that.
```js
function scoreFrame (frame, nextFrame) {
  if (frame[0] + frame[1] === 10) {
    return frame[0] + frame[1] + nextFrame[0]
  }
  return frame[0] + frame[1]
}
```
Cool, our tests are passing again, but we're starting to get some duplication. Let's apply some refactoring to remove the duplication and make it clearer.
```js
function scoreFrame (frame, nextFrame) {
  var score = frame[0] + frame[1]
  if (score === 10) {
    score += nextFrame[0]
  }
  return score
}
```
Much better. Run the tests. Passing! Let's commit it.
```shell
git add .
git commit -m "Scoring spare frames"
```

## Test 5: Single strike frames

Now let's add a feature for scoring a strike frame. Because a strike uses the next 2 rolls, if the first is another strike (called a double), we'll need yet another frame. Let's tackle the double scenario later. For now, let's handle the single-strike scenario.
```js
test('scores a single strike frame', function(t) {
  var frame = [10]
  var nextFrame = [6, 3]
  var score = game.scoreFrame(frame, nextFrame)
  t.equals(score, 19)
  t.end()
})
```
Failing, just as we expected. So let's implement it.
```js
function scoreFrame (frame, nextFrame) {
  var score = frame[0] + frame[1]
  if (frame[0] === 10) {
    score = frame[0] + nextFrame[0] + nextFrame[1]
  } else if (score === 10) {
    score += nextFrame[0]
  }
  return score
}
```
Now we're finding that rhythm. Since we're passing again, let's commit it.
```sh
git add .
git commit -m "Scoring single strike frames"
```

## Test 6: Double strike frames

Now let's implement that other strike scenario where we have 2 strikes in a row and need a third frame. First, a new test.
```js
test('scores a double strike frame', function(t) {
  var frame = [10]
  var nextFrame = [10]
  var anotherFrame = [8, 1]
  var score = game.scoreFrame(frame, nextFrame, anotherFrame)
  t.equals(score, 28)
  t.end()
})
```
As we expected, our new test is failing, so let's implement it.
```js
function scoreFrame (frame, nextFrame, anotherFrame) {
  var score = frame[0] + frame[1]
  if (frame[0] === 10) {
    if (nextFrame[0] === 10) {
      score = frame[0] + nextFrame[0] + anotherFrame[0]
    } else {
      score = frame[0] + nextFrame[0] + nextFrame[1]
    }
  } else if (score === 10) {
    score += nextFrame[0]
  }
  return score
}
```
And we're passing again, great! But this is starting to look a bit unweildy and hard to follow. We can apply some _extract method_ refactors and make the code easier to read (and thus maintain).
```js
function scoreFrame (frame, nextFrame, anotherFrame) {
  var score = frame[0] + frame[1]
  if (isStrike(frame)) {
    score = scoreStrikes(frame, nextFrame, anotherFrame)
  } else if (isSpare(frame)) {
    score += nextFrame[0]
  }
  return score
}

function scoreStrikes (frame, nextFrame, anotherFrame) {
  var score = frame[0]
  if (nextFrame[0] === 10) {
    score = score + nextFrame[0] + anotherFrame[0]
  } else {
    score = score + nextFrame[0] + nextFrame[1]
  }
  return score
}

function isStrike (frame) {
  return frame[0] === 10
}

function isSpare (frame) {
  return frame[0] + frame[1] === 10
}
```
This should be much easier to read. Run the tests and make sure they still pass. Making sure the tests still pass is very important after refactoring. Cool, let's commit it.
```shell
git add .
git commit -m "Scoring double strike frames"
```

## Test 7: Scores the frames of a game

Now that we can score many types of frames, let's add a feature to score a whole game of 10 frames. Because the 10th frame has special behaviour if there is a strike or a spare in it, we'll leave that scenario out of this test and test it separately later. But we can still add normal, spare, single strike and double strike frames.
```js
test('scores a game', function(t) {
  var frames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [4, 4]
  ] // 3      18      27     46     55     80    97     104     111     119
  var score = game.scoreGame(frames)
  t.equals(score, 119)
  t.end()
})
```
Running the tests now will cause them to fail because there is no `scoreGame()` method. Let's add it.
```js
module.exports = {
  scoreFrame: scoreFrame,
  scoreGame: scoreGame
}

function scoreGame (frames) {
}
```
Now when we run the tests, the new one fails because of an incorrect return value (`undefined`). Let's implement it using the `scoreFrame()` method we've been implementing.
```js
function scoreGame (frames) {
  var score = 0
  for (var i = 0; i < frames.length; i++) {
    score += this.scoreFrame(frames[i], frames[i + 1], frames[i + 2])
  }
  return score
}
```
Great! The tests are passing and our code doesn't seem to need any refactoring yet. Let's commit it.
```shell
git add .
git commit -m "Scoring the frames of a game"
```

## Test 8: Scores a game with a strike or spare in the 10th

Now let's add a feature that calculates the 10th frame when it contains a strike or a spare. You guessed it, a test first.
```js
test('scores a spare in the 10th frame', function(t) {
  var spareFrames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [6, 4, 8]
  ] // 3      18      27     46     55     80    97     104     111     129
  var score = game.scoreGame(frames)
  t.equals(score, 129)
  t.end()
})
```
This test fails because our code is looking for another frame after the 10th frame since the first 2 rolls of the 10th frame equal 10. Let's add a condition for this scenario by creating an `isTenth` variable and passing it to `scoreFrame()`.
```js
function scoreGame (frames) {
  var score = 0
  var isTenth = false
  for (var i = 0; i < frames.length; i++) {
    isTenth = i === frames.length - 1
    score += this.scoreFrame(frames[i], frames[i + 1], frames[i + 2], isTenth)
  }
  return score
}

function scoreFrame (frame, nextFrame, anotherFrame, isTenth) {
  var score = frame[0] + frame[1]
  if (isTenth) {
    return calculateTenth(frame)
  }
  if (isStrike(frame)) {
    score = scoreStrikes(frame, nextFrame, anotherFrame)
  } else if (isSpare(frame)) {
    score += nextFrame[0]
  }
  return score
}

function calculateTenth (frame) {
  var score = frame[0] + frame[1]
  if (isStrike(frame) || isSpare(frame)) {
    score += frame[2]
  }
  return score
}
```
Not only does this get the tests passing for spares in the 10th frame, it should also account for strikes. Therefore, the following tests should pass as well.
```js
test('scores a strike in the 10th frame', function (t) {
  var strikeFrames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [10, 4, 5]
  ] // 3      18      27     46     55     80    97     104     111      130
  var strikeScore = game.scoreGame(strikeFrames)
  t.equals(strikeScore, 130)
  t.end()
})
```
Great work! Feel free to tidy up the code as you see fit, ensure the tests still pass, and commit it.
```shell
git add .
git commit -m "Scoring strikes and spares in the 10th frame"
```

## Create a client to consume the game module

Name it `index.js` so you can run it with `npm run`.

[todo]

## Write more tests to respond to unexpected input

Should throw errors.

[todo]

Examples:

* More than or less than 10 frames
* Frames where the 2 rolls add up to more than 10
* Negative numbers and other non-numeric types

## Conclusion

[todo]
