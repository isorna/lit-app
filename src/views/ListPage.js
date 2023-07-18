import { LitElement, html } from 'lit'

/**
 * List Page component.
 */
class ListPage extends LitElement {
  static properties = {
    _pageTitle: {}
  }

  constructor () {
    super()
    this._pageTitle = 'List Page'
  }

  render () {
    return html`
    <page-header title=${this._pageTitle}></page-header>
    <p><a href="/">Go back Home</a></p>
    `
  }
}

window.customElements.define('list-page', ListPage)

// Each view should export its own route, so that it's used by the router:
export const listPageRoute = {
  path: '/list',
  name: 'list',
  render: () => html`<list-page></list-page>`,
  enter: (params) => {
    console.log('List Page route entered', params)
  }
}