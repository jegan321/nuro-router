export interface MatchResult {
  isMatch: boolean
  params: Record<string, string>
}

export function match(actualSegments: string[], routeSegments?: string[]): MatchResult {
  if (!routeSegments) {
    return {
      isMatch: false,
      params: {}
    }
  }

  let isMatch = true
  const params: Record<string, string> = {}
  const greaterLength =
    actualSegments.length > routeSegments.length ? actualSegments.length : routeSegments.length

  for (let i = 0; i < greaterLength; i++) {
    const actualSegment = actualSegments.length > i ? actualSegments[i] : null
    const routeSegment = routeSegments.length > i ? routeSegments[i] : null

    if (actualSegment === null || routeSegment === null) {
      isMatch = false
      break
    }

    if (routeSegment.startsWith(':') && routeSegment.length > 1) {
      const paramName = routeSegment.substring(1, routeSegment.length)
      params[paramName] = actualSegment
    } else if (routeSegment !== actualSegment) {
      isMatch = false
      break
    }
  }

  return {
    isMatch,
    params
  }
}
