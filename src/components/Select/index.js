import styles from './index.scss';
const template = document.createElement('template');

template.innerHTML= `
<style>${styles.toString()}</style>
<div data-select-id="" class="custom-select">
    <div class="custom-select__wrapper">
        <div class="custom-select__placeholder"></div>
        <div class="custom-select__selected">Adem</div>
    </div>
    <ul class="list"></ul>
</div>
`

class SelectBox extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.selectedValue = null;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const selectId = Math.round(Math.random() * 10);
        this.$wrapper = this.shadowRoot.querySelector('.custom-select')
        this.$placeholder = this.shadowRoot.querySelector('.custom-select__placeholder');
        this.$selected = this.shadowRoot.querySelector('.custom-select__selected');
        this.$list = this.shadowRoot.querySelector('.list');
        this.$wrapper.setAttribute('data-select-id', selectId)
    }
    toggle() {
        this.isOpen = !this.isOpen;
        this.isOpen ? this.$wrapper.classList.add('custom-select--open') : this.$wrapper.classList.remove('custom-select--open')
    }
    outSideClick(e) {
        const isOutside = e.target.shadowRoot && e.target.shadowRoot.querySelector('.custom-select') && (e.target.shadowRoot.querySelector('.custom-select').getAttribute('data-select-id') !== this.selectId);
        if(isOutside === null && this.isOpen) {
            this.toggle();
        }
    } 
    connectedCallback() {
        this.shadowRoot.querySelector('.custom-select__wrapper').addEventListener('click', () => this.toggle())
        document.addEventListener('click',  (e) =>  this.outSideClick(e))
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('.custom-select__wrapper').removeEventListener('click', () => this.toggle())
        document.removeEventListener('click',  (e) =>  this.outSideClick(e));
    }
    static get observedAttributes() {
        return ['label', 'option', 'options'];
    }

    get label() {
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);
    }

    get option() {
        return this.getAttribute('option');
    }

    set option(value) {
        this.setAttribute('option', value);
    }

    get options() {
        return JSON.parse(this.getAttribute('options'));
    }

    set options(value) {
        this.setAttribute('options', JSON.stringify(value));
    }
    static get observedAttributes() {
        return ['label', 'option', 'options'];
      }
    
    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }
    render() {
        this.$placeholder.innerHTML = this.label;
        this.$placeholder.style.display = 'block'
        this.$selected.style.display = 'none'

    
        if (this.options) {
          const selected = this.options.find(item => item.key === this.option);
          if(selected) {
              this.$placeholder.style.display = 'none'
              this.$selected.style.display = 'block'
              this.$selected.setAttribute('data-id', selected.key);
              this.$selected.innerHTML = selected.label;
            }
        }
    
        this.$list.innerHTML = '';
    
        Object.keys(this.options || {}).forEach(key => {
          let option = this.options[key];
          let $option = document.createElement('li');
    
          $option.innerHTML = option.label;
          $option.classList.add('list__item');
          $option.setAttribute('data-id', option.key);
    
          if (this.option && this.option === option.key) {
            $option.classList.add('list__item--selected');
          }
    
          $option.addEventListener('click', () => {
            this.option = option.key;
    
            this.toggle();
    
            this.dispatchEvent(
              new CustomEvent('onChange', { detail: key })
            );
    
            this.render();
          });
    
          this.$list.appendChild($option);
        });
    }
}
export default SelectBox;
