import { BrowserHistoryRouter } from './browser-history-router'
import { RouterLink } from './components/router-link'
import { RouterSwitch } from './components/router-switch'
import { Router } from './router'

const NuroRouter = {
  install(Nuro: any) {
    const router: Router = new BrowserHistoryRouter()
    Nuro.mixin({
      $router: router
    })
    Nuro.include('router-switch', RouterSwitch)
    Nuro.include('router-link', RouterLink)
  }
}

export default NuroRouter
