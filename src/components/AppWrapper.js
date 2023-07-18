import { LitElement, html } from 'lit'
import { Routes } from '@lit-labs/router'
import { routes } from '@/config/routes.js'

/**
 * AppWrapper element.
 * Contains the router outlet and main app capabilities.
 */
class AppWrapper extends LitElement {
  _routes = new Routes(this, routes)

  constructor () {
    super()
  }

  // TO DO:
  // * use task: https://github.com/lit/lit/tree/main/packages/labs/task
  // * add context: https://lit.dev/docs/data/context/
  // * create controller for fetch: https://lit.dev/docs/composition/controllers/
  // * use localization: https://lit.dev/docs/localization/overview/

  render () {
    return html`
    <main>${ this._routes.outlet() }</main>
    `
  }

  connectedCallback() {
    this._routes.goto(window.location.pathname);
    super.connectedCallback();
  }
}

window.customElements.define('app-wrapper', AppWrapper)