import { BrowserHistoryRouter } from './routers/browser-history-router'
import { RouterLink } from './components/router-link'
import { RouterSwitch } from './components/router-switch'
import { Options, PathChangeCallback, Router } from './routers/router'
import { HardRefreshRouter } from './routers/hard-refresh-router'

const NuroRouter = {
  install(Nuro: any, options?: Options) {
    const router = getRouterImplementation(options)
    Nuro.mixin({
      $router: router
    })
    Nuro.include('router-switch', RouterSwitch)
    Nuro.include('router-link', RouterLink)
  }
}

function getRouterImplementation(options?: Options): Router {
  if (options?.mode === 'browser-history') {
    return new BrowserHistoryRouter()
  } else if (options?.mode == 'hard-refresh') {
    return new HardRefreshRouter()
  } else {
    // Default
    return new HardRefreshRouter()
  }
}

export { NuroRouter, Router, PathChangeCallback }
