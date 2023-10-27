export {
  scoreFrame
}

function scoreFrame(frame, nextFrame, nextNextFrame) {
  let score = frame.reduce((frameScore, ball) => frameScore + ball, 0)
  if (isSpare(frame)) {
    score += nextFrame[0]
  } else if (isStrike(frame)) {
    score += nextFrame.reduce((frameScore, ball) => frameScore + ball, 0)
    if (isStrike(frame) && isStrike(nextFrame)) {
      score += nextNextFrame[0]
    }
  }
  return score
}

function isStrike(frame) {
  return frame[0] === 10
}

function isSpare(frame) {
  return frame[0] + frame[1] === 10 && frame[0] !== 10
}
