import { LitElement, html } from 'lit'

/**
 * Page Header component.
 *
 * @title - Page header title
 */
class PageHeader extends LitElement {
  static properties = {
    title: {}
  }

  constructor () {
    super()
    this.title = 'Default Page Title'
  }

  render () {
    return html`
    <header>
      <h1>LIT APP: ${ this.title }</h1>
    </header>
    `
  }
}

window.customElements.define('page-header', PageHeader)