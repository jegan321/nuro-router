import { Router } from '../router'

interface Props {
  to?: string
  href?: string
  '@click': (event: Event) => void
  children?: {
    attrs: {
      path?: string
    }
  }[]
}

export class RouterLink {
  props!: Props
  $router!: Router

  render(createElement: any) {
    const anchorProps = { ...this.props }
    delete anchorProps.to
    delete anchorProps.children
    anchorProps['href'] = this.props.to
    anchorProps['@click'] = this.handleClick
    return createElement('a', anchorProps, this.props.children)
  }

  handleClick(event: Event) {
    event.preventDefault()
    this.$router.goTo(this.props.to)
  }
}
