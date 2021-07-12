export interface Router {
  goTo: (newPath?: string) => void
  getCurrentPath: () => string
  subscribeToPathChange: (pathChangeCallback: PathChangeCallback) => void
  unsubscribeToPathChange: (pathChangeCallback: PathChangeCallback) => void
}

export interface PathChangeCallback {
  (newPath: string): void
}
