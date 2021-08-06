import { match } from '../util/match.js'
import { parseSegments } from '../util/segments.js'
import { assertEquals, assertFalse, assertTrue } from './assert.js'

describe('segments should match', () => {
  it('two empty arrays', () => {
    const result = match([] /* Actual */, [] /* Route */)
    assertTrue(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('one segment each, exactly the same', () => {
    const result = match(['foo'] /* Actual */, ['foo'] /* Route */)
    assertTrue(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('two segments, exactly the same', () => {
    const result = match(['foo', 'bar'] /* Actual */, ['foo', 'bar'] /* Route */)
    assertTrue(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('two segments, second is param', () => {
    const result = match(['foo', 'bar_value'] /* Actual */, ['foo', ':bar'] /* Route */)
    assertTrue(result.isMatch)
    assertEquals(result.params.bar, 'bar_value')
  })

  it('two segments, first is param', () => {
    const result = match(['foo_value', 'bar'] /* Actual */, [':foo', 'bar'] /* Route */)
    assertTrue(result.isMatch)
    assertEquals(result.params.foo, 'foo_value')
  })
})

describe('segments should not match', () => {
  it('one segment actual, one segment route', () => {
    const result = match(['bar'] /* Actual */, ['fizz'] /* Route */)
    assertFalse(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('two segment actual, two segment route', () => {
    const result = match(['bar', 'foo'] /* Actual */, ['bar', 'fizz'] /* Route */)
    assertFalse(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('one segment actual, empty route', () => {
    const result = match(['bar'] /* Actual */, [] /* Route */)
    assertFalse(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('empty actual, one segment route', () => {
    const result = match([] /* Actual */, ['bar'] /* Route */)
    assertFalse(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('two segment actual, one segment route', () => {
    const result = match(['foo', 'bar'] /* Actual */, ['foo'] /* Route */)
    assertFalse(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('one segment actual, two segment route', () => {
    const result = match(['foo'] /* Actual */, ['foo', 'bar'] /* Route */)
    assertFalse(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('one segment actual, two segment route with param', () => {
    const result = match(['foo'] /* Actual */, ['foo', ':bar'] /* Route */)
    assertFalse(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })

  it('no route segments', () => {
    const result = match(['foo'] /* Actual */)
    assertFalse(result.isMatch)
    assertEquals(Object.keys(result.isMatch).length, 0)
  })
})

describe('paths should match', () => {
  it('root path', () => {
    const result = match(parseSegments('/'), parseSegments('/'))
    assertTrue(result.isMatch)
  })
  it('one level path', () => {
    const result = match(parseSegments('/foo'), parseSegments('/foo'))
    assertTrue(result.isMatch)
  })
})
