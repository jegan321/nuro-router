import { PathChangeCallback, Router } from './router'

export class HardRefreshRouter implements Router {
  navigateWithJS = false

  goTo(newPath?: string) {
    if (newPath) {
      window.location.pathname = newPath
    }
  }

  getCurrentPath() {
    return window.location.pathname
  }

  subscribeToPathChange(pathChangeCallback: PathChangeCallback) {}

  unsubscribeToPathChange(pathChangeCallback: PathChangeCallback) {}
}
