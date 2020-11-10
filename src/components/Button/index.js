import styles from './index.scss';
const template = document.createElement('template');

template.innerHTML= `
<style>${styles.toString()}</style>
<button class="btn">
    <slot />
</button>
`

class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.dispatchEvent( new CustomEvent('onClick'));
    }
   
}
export default Button;
