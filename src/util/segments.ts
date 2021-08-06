export function parseSegments(path?: string): string[] {
  if (!path || path.length < 2) {
    return []
  }
  let pathWithoutLeadingSlash = path
  if (path.startsWith('/')) {
    pathWithoutLeadingSlash = path.substring(1, path.length)
  }
  return pathWithoutLeadingSlash.split('/')
}
