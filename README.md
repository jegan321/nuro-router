# Nuro Router

WORK IN PROGRESS

A simple SPA router for Nuro apps.

## Features
* Navigate between pages without a browser refresh
* Utilizes the browser history API so back/forward buttons still work
* URL parameters

## Install
```bash
npm install nuro-router
```
or 
```html
<script src="path/to/nuro-router.js"></script>
```

## Usage
First install NuroRouter as a plugin. Then you can use the router's components in your components
```js
import { Nuro } from 'nuro'
import { NuroRouter } from 'nuro-router'

Nuro.install(NuroRouter)

class FooComponent {
  template = `<div>Foo</div>`
}

class BarComponent {
  template = `<div>Bar {{props.routeParams.id}}</div>`
}

class HomeComponent {
  template = `<div>Home</div>`
}

class PageNotFoundComponent {
  template = `<div>Page not found</div>`
}

class AppRouter {
  template = `
    <div>
      <nav>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/foo">Foo</router-link>
          </li>
          <li>
            <router-link to="/bar/123">Bar 123</router-link>
          </li>
        </ul>
      </nav>
      <router-switch :routes="routes"></router-switch>
    </div>
  `
  beforeInit() {
    this.routes = [
      { path: "/foo", component: FooComponent },
      { path: "/bar/:id", component: BarComponent },
      { path: "/", component: HomeComponent },
      { path: "*", component: PageNotFoundComponent}
    ]
  }
}

Nuro.mount(AppRouter)
```