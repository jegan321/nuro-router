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
      window.history.pushState(null, '', newPath)
      this.publishPathChange(newPath)
    }
  }

  publishPathChange(newPath: string) {
    this.subscriptions.forEach(callback => {
      callback(newPath)
    })
  }

  getCurrentPath() {
    return window.location.pathname
  }

  subscribeToPathChange(pathChangeCallback: PathChangeCallback) {
    this.subscriptions.push(pathChangeCallback)
  }

  unsubscribeToPathChange(pathChangeCallback: PathChangeCallback) {
    const index = this.subscriptions.indexOf(pathChangeCallback)
    if (index > -1) {
      this.subscriptions.splice(index, 1)
    }
  }
}
