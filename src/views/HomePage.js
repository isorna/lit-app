import { LitElement, css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'

/**
 * Home Page component.
 */
class HomePage extends LitElement {
  static properties = {
    _pageTitle: {},
    _todos: {}
  }

  constructor () {
    super()
    this._pageTitle = 'Home Page'
    this._todos = [
      { text: 'use task: https://github.com/lit/lit/tree/main/packages/labs/task', done: false },
      { text: 'add context: https://lit.dev/docs/data/context/', done: false },
      { text: 'create controller for fetch: https://lit.dev/docs/composition/controllers/', done: false },
      { text: 'use localization: https://lit.dev/docs/localization/overview/', done: false },
    ]
  }

  render () {
    return html`
    <page-header title=${this._pageTitle}></page-header>
    <p><a href="/list">List page</a></p>
    <ul>
      ${this._todos.map((item, index) => {
        const classes = { '--done': item.done }
        return html`<li class="to-do__item ${ classMap(classes) }" @click=${ () => this._updateState(index) }>${ item.text }</li>`
      })}
    </ul>
    `
  }

  static get styles () {
    return css`
      .to-do__item {
        cursor: pointer;
        line-height: 40px;
      }
      .to-do__item:hover {
        background-color: rgba(255, 255, 255, .5);
      }
      .--done {
        text-decoration: line-through;
      }
    `
  }

  _updateState (index) {
    this._todos = this._todos.map((item, itemIndex) => {
      return (index === itemIndex)
      ? {
        text: item.text,
        done: !item.done
      }
      : item
    })
  }
}

window.customElements.define('home-page', HomePage)

// Each view should export its own route, so that it's used by the router:
export const homePageRoute = {
  path: '/',
  name: 'home',
  render: () => html`<home-page></home-page>`,
  enter: (params) => {
    console.log('Home Page route entered', params)
  }
}