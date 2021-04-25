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

    // Find the route that matches to the brower's current url
    const matchingRoute = routes.find(route => {
      return route.attrs.path === this.currentPath
    })

    // Return the matching route or an empty div if none matched
    return matchingRoute ? matchingRoute : createElement('div')
  }

  beforeMount() {
    this.currentPath = this.$router.getCurrentPath()
    this.$router.subscribeToPathChange((current, previous) => {
      this.currentPath = current
    })
  }
}
