import { LitElement, css, html } from 'lit'
import { animate } from '@lit-labs/motion'
import litLogo from '@/assets/lit.svg'
import viteLogo from '/vite.svg'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static properties = {
    hostName: {},
    shadowName: {},
    shifted: {},
  }
  static get properties () {
    return {
      /**
       * Copy for the read the docs hint.
       */
      docsHint: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
    }
  }

  constructor () {
    super()
    this.addEventListener('click', (e) => (this.hostName = e.target.localName))
    this.docsHint = 'Click on the Vite and Lit logos to learn more'
    this.count = 0
    this.hostName = ''
    this.shadowName = ''
  }

  createRenderRoot () {
    // https://lit.dev/docs/components/events/#adding-event-listeners-to-the-component-or-its-shadow-root
    const root = super.createRenderRoot()
    // This allows to capture events inside the component's shadow root
    root.addEventListener('click', (e) => (this.shadowName = e.target.localName))
    return root
  }

  // Reactive Update Cycle:
  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._handleResize);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleResize);
    super.disconnectedCallback();
  }

  shouldUpdate (changedProperties) {
    console.log('should update', changedProperties)
    return true
  }

  willUpdate (changedProperties) {
    // Do calculations and property assignations here,
    // just before render(), this doesn't trigger an update!!!
    console.log('will update', changedProperties)
  }

  render () {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
        <div class="box ${this.shifted ? 'shifted' : ''}" ${animate()}></div>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
      <p><button>Click Me!</button></p>
      <p>Component target: ${this.hostName}</p>
      <p>Shadow target: ${this.shadowName}</p>
    `
  }

  async firstUpdated() {
    // This callback fires after the first time your component has been updated and called its render method,
    // but before the browser has had a chance to paint.
    await new Promise((r) => setTimeout(r, 0));
    this.addEventListener('click', this._handleClick);
  }

  updated (changedProperties) {
    // Called after every update cycle,
    // any change in reactive properties here will trigger another update cycle!
    console.log('updated', changedProperties)
  }

  async _onClick () {
    // Event listeners added using the declarative @ syntax in the template are automatically bound to the component.
    this.count++
    this.shifted = !this.shifted

    const options = {
      detail: { count: this.count },
      bubbles: true,
      composed: true,
    }
    // updateComplete Promise can be awaited after changing state, but before dispatching the event.
    try {
      await this.updateComplete;
    } catch (e) {
      /* handle error */
      console.error('update cycle error')
      // https://lit.dev/docs/components/lifecycle/#errors-in-the-update-cycle
    }
    // Custom Events vs standard Events:
    // https://lit.dev/docs/components/events/#standard-custom-events
    this.dispatchEvent(new CustomEvent('mylogin', options))
    // This event is listened on the parent component with:
    // <p @mylogin=${this._loginListener}><slot></slot></p>
  }

  // When adding listeners imperatively with addEventListener, you'll want to use an arrow function so that this refers to the component
  _handleResize = (e) => {
    console.log('resize')
  }

  _handleClick = (e) => {
    console.log('click', e.target.textContent, 'Origin: ', e.composedPath()[0]);
  }

  // Passing null, undefined or nothing to an @ expression will cause any existing listener to be removed.

  static get styles () {
    return css`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.lit:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }

      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      ::slotted(h1) {
        font-size: 3.2em;
        line-height: 1.1;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      .box {
        position: absolute;
        width: 100px;
        height: 100px;
        background: steelblue;
        top: 100px;
        border-radius: 50%;
      }

      .shifted {
        right: 0;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `
  }
}

window.customElements.define('my-element', MyElement)
