import { test, expect } from 'vitest'
import * as score from './score'

test('test setup working', () => {
  expect(true).toBeTruthy()
})

test('scores a gutterball frame', () => {
  const frame = [0, 0]
  const expected = 0
  const actual = score.scoreFrame(frame)
  expect(actual).toBe(expected)
})

test('scores a normal frame', () => {
  const frame = [2, 3]
  const expected = 5
  const actual = score.scoreFrame(frame)

  expect(actual).toBe(expected)
})

test('scores a spare frame', () => {
  const frame = [1, 9]
  const nextBall = [2]
  const expected = 12
  const actual = score.scoreFrame(frame, nextBall)

  expect(actual).toBe(expected)
})

test('scores a strike', () => {
  const frame = [10, 0]
  const nextFrame = [3, 6]
  const expected = 19
  const actual = score.scoreFrame(frame, nextFrame)

  expect(actual).toBe(expected)
})

test('scores a double strike', () => {
  const frame = [10, 0]
  const nextFrame = [10, 0]
  const nextNextFrame = [3, 5]
  const expected = 23
  const actual = score.scoreFrame(frame, nextFrame, nextNextFrame)

  expect(actual).toBe(expected)
})