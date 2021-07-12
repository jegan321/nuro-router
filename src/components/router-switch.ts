import { Router } from '../router'

interface Props {
  children: {
    attrs: {
      path?: string
    }
  }[]
}

export class RouterSwitch {
  currentPath: String = ''

  props!: Props
  $router!: Router

  render(createElement: any) {
    // Get all the child nodes that have a path prop
    const routes = this.props.children.filter(child => child.attrs.path)

    let defaultRoute

    // Find the route that matches to the brower's current url
    const matchingRoute = routes.find(route => {
      if (route.attrs.path === '*') {
        defaultRoute = route
      }
      return route.attrs.path === this.currentPath
    })

    // If no match but a default route was found, return default
    if (matchingRoute == null && defaultRoute != null) {
      return defaultRoute
    }

    // Return the matching route or an empty div if none matched
    return matchingRoute ? matchingRoute : createElement('div')
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
