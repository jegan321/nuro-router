export interface Router {
  goTo: (newPath?: string) => void
  getCurrentPath: () => string
  subscribeToPathChange: (pathChangeCallback: PathChangeCallback) => void
  unsubscribeToPathChange: (pathChangeCallback: PathChangeCallback) => void
  navigateWithJS: boolean
}

export interface PathChangeCallback {
  (newPath: string): void
}

export interface Options {
  mode?: 'browser-history' | 'hard-refresh'
}
