import { Router } from '../routers/router'
import { match } from '../util/match'
import { parseSegments } from '../util/segments'

interface Props {
  routes?: RouteRecord[]
}

interface RouteRecord {
  path: string
  component: any // Nuro Component
}

export class RouterSwitch {
  currentPath: string = ''
  routes?: RouteRecord[]
  props!: Props
  $router!: Router

  render(createElement: any) {
    // Routes can be passed as a prop or via a subclass constructor
    let routes: RouteRecord[] = []
    if (this.props.routes) {
      routes = this.props.routes
    } else if (this.routes) {
      routes = this.routes
    }
    const pathSegments = parseSegments(this.currentPath)
    let routeParams = {}
    let defaultRoute: RouteRecord | undefined
    let matchingRoute: RouteRecord | undefined

    // Find the route that matches to the brower's current url
    matchingRoute = routes.find(route => {
      if (route.path === '*') {
        defaultRoute = route
      }
      const routeSegments = parseSegments(route.path)
      const matchResult = match(pathSegments, routeSegments)
      if (matchResult.isMatch) {
        routeParams = matchResult.params
        return true
      }
    })

    // If no match but a default route was found, return default
    if (matchingRoute == null && defaultRoute != null) {
      return createComponent(createElement, defaultRoute, routeParams)
    }

    // Return empty div if not route matched
    if (!matchingRoute) {
      return createElement('div')
    }

    // Return the matching route
    return createComponent(createElement, matchingRoute, routeParams)
  }

  changePath(newPath: string) {
    this.currentPath = newPath
  }

  beforeMount() {
    this.currentPath = this.$router.getCurrentPath()
    this.$router.subscribeToPathChange(this.changePath)
  }

  beforeUnmount() {
    this.$router.unsubscribeToPathChange(this.changePath)
  }
}

function createComponent(createElement: any, route: RouteRecord, params: any) {
  return createElement(route.component, {
    routeParams: params
  })
}
