import { parseSegments } from '../util/segments.js'
import { assertEquals } from './assert.js'

describe('should parse segments', () => {
  it('root path', () => {
    const segments = parseSegments('/')
    assertEquals(segments.length, 0)
  })

  it('one segment', () => {
    const segments = parseSegments('/foo')
    assertEquals(segments.length, 1)
    assertEquals(segments[0], 'foo')
  })

  it('two segments', () => {
    const segments = parseSegments('/foo/bar')
    assertEquals(segments.length, 2)
    assertEquals(segments[0], 'foo')
    assertEquals(segments[1], 'bar')
  })

  it('two segments with dynamic segment', () => {
    const segments = parseSegments('/foo/:bar')
    assertEquals(segments.length, 2)
    assertEquals(segments[0], 'foo')
    assertEquals(segments[1], ':bar')
  })
})
