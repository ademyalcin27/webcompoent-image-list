import styles from './index.scss';
const template = document.createElement('template');

template.innerHTML= `
<style>${styles.toString()}</style>
<div class="toast">
    <div class="toast__message"></div>
    <button class="toast__close">x</button>
</div>
`

class Toast extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.$wrapper = this.shadowRoot.querySelector('.toast')
        this.$message = this.shadowRoot.querySelector('.toast__message');
        this.$button = this.shadowRoot.querySelector('.toast__close');
        setTimeout(() => {
            this.$message.innerHTML = this.getAttribute('message');
            this.$wrapper.classList.add(this.getAttribute('status'));
            this.dispatchEvent( new CustomEvent('onClick'));
        })
        const toastMessageLength = document.querySelectorAll('app-toast').length;
        if(toastMessageLength){
            this.$wrapper.style.bottom = (toastMessageLength * 40 + 10) + 'px';
        }

        // destroy 5 sec later
        this.$interval = setTimeout(()=> this.remove(), 5000);
    }

    destroy() {
        clearTimeout(this.$interval)
        this.remove();
    }

    connectedCallback() {
        this.$button.addEventListener('click',  () => this.destroy())
    }
    disconnectedCallback() {
        this.$button.removeEventListener('click',  () => this.destroy())
    }
   
}
export default Toast;
