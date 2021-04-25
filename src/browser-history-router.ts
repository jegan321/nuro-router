import { PathChangeCallback, Router } from './router'

export class BrowserHistoryRouter implements Router {
  subscriptions: PathChangeCallback[] = []

  constructor() {
    window.addEventListener('popstate', () => {
      const newPath = this.getCurrentPath()
      this.publishPathChange(newPath)
    })
  }

  goTo(newPath?: string) {
    if (newPath) {
      this.publishPathChange(newPath)
    }
  }

  publishPathChange(newPath: string) {
    const previousPath = this.getCurrentPath()
    window.history.pushState(null, '', newPath)
    this.subscriptions.forEach(callback => {
      callback(previousPath, newPath)
    })
  }

  getCurrentPath() {
    return window.location.pathname
  }

  subscribeToPathChange(pathChangeCallback: PathChangeCallback) {
    this.subscriptions.push(pathChangeCallback)
  }
}
