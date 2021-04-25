# Nuro Router

A simple SPA router for Nuro apps

## Features
* Navigate between pages without a browser refresh
* Utilizes the browser history API so back/forward buttons still work

## TODO:
* Path parameters

## Install
```bash
npm install nuro-router
```

## Usage
First install NuroRouter as a plugin
```js
import { NuroRouter } from 'nuro-router'
Nuro.install(NuroRouter)
```

Then you can use the router's components in your components
```html
<div>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/users">Users</router-link>
      </li>
    </ul>
  </nav>
  <router-switch>
    <p path="/about">
      About page
    </p>
    <p path="/users">
      Users page
    </p>
    <p path="/">
      Home page
    </p>
  </router-switch>
</div>
```