import styles from './index.scss';
console.log(styles)
const template = document.createElement('template');

template.innerHTML= `
<style>${styles.toString()}</style>
<div class="image">
    <div class="image__container">
        <img src="" class="image__container-item"/>
    </div>
    <div class="like">
        <span class="like__count">Likes: 0</span>
        <button class="like__button"><i class="fa fa-heart"></i></button>
    </div>
</div>
`

class Image extends HTMLElement {
    constructor() {
        super();
        this.isFavourite = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Attributes 
        setTimeout(() => {
        this.shadowRoot.querySelector('img').src = this.getAttribute('poster');
        this.shadowRoot.querySelector('.like__count').innerHTML = 'Likes:' + this.getAttribute('likes');
            if(this.getAttribute('isLike') === 'true') {
                this.isFavourite = true;
                this.shadowRoot.querySelector('.like__button').classList.add('like__button--active');
            }
        })
    }
    favToggle() {
        this.isFavourite = !this.isFavourite;
        if(this.isFavourite) {
            this.shadowRoot.querySelector('.like__button').classList.add('like__button--active');
        } else {
           this.shadowRoot.querySelector('.like__button').classList.remove('like__button--active');
        }
        const detail = { isFavourite: this.isFavourite, id: this.getAttribute('card-id'), likes: this.getAttribute('likes'), previewURL: this.getAttribute('poster')};
        this.dispatchEvent(new CustomEvent('favourite', { bubbles: true, detail}));
    }
    connectedCallback() {
        this.shadowRoot.querySelector('.like__button').addEventListener('click',  () => this.favToggle())
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('.like__button').removeEventListener('click',  () => this.favToggle())
    }
}
export default Image;
